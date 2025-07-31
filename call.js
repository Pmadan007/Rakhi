document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM loaded");

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("room");
  const role = urlParams.get("role") || "sister";

  if (!roomId) {
    console.error("❌ No room ID provided in URL");
    document.body.innerHTML += "<p style='color: red;'>Error: No room ID provided in URL</p>";
    return;
  }

  console.log(`[${new Date().toLocaleTimeString()}] Joining room: ${roomId} as ${role}`);

  try {
    // Get token with better debugging
    const tokenUrl = `/.netlify/functions/getToken?roomId=${roomId}&role=${role}`;
    console.log("Fetching token from:", tokenUrl);
    
    const tokenRes = await fetch(tokenUrl);
    console.log("Response status:", tokenRes.status);
    console.log("Response headers:", Object.fromEntries(tokenRes.headers.entries()));
    
    // Get response as text first to see what we're actually getting
    const responseText = await tokenRes.text();
    console.log("Raw response:", responseText);

    // Try to parse as JSON
    let tokenJson;
    try {
      tokenJson = JSON.parse(responseText);
    } catch (parseError) {
      console.error("❌ Failed to parse response as JSON:", parseError);
      console.error("Response was:", responseText);
      document.body.innerHTML += `<p style='color: red;'>Parse Error: Response was not JSON<br>Response: ${responseText.substring(0, 200)}...</p>`;
      return;
    }

    console.log(`[${new Date().toLocaleTimeString()}] Parsed token response:`, tokenJson);

    if (!tokenRes.ok) {
      console.error("❌ Token fetch failed:", tokenJson);
      document.body.innerHTML += `<p style='color: red;'>Token Error (${tokenRes.status}): ${tokenJson.error || 'Unknown error'}</p>`;
      return;
    }

    if (!tokenJson.token) {
      console.error("❌ No token received");
      document.body.innerHTML += "<p style='color: red;'>Error: No token received</p>";
      return;
    }

    const token = tokenJson.token;
    console.log("✅ Token received successfully");

    // Test if HMS SDK is loaded
    if (typeof HMSReactiveStore === 'undefined') {
      console.error("❌ HMS SDK not loaded");
      document.body.innerHTML += "<p style='color: red;'>Error: HMS SDK not loaded</p>";
      return;
    }

    // Initialize HMS
    console.log("Initializing HMS...");
    const hms = new HMSReactiveStore.HMSStore();
    const hmsActions = new HMSReactiveStore.HMSActions(hms);
    const hmsNotifications = new HMSReactiveStore.HMSNotifications(hms);

    // Listen for notifications (errors, etc.)
    hmsNotifications.onNotification((notification) => {
      console.log("HMS Notification:", notification);
      if (notification.type === "ERROR") {
        console.error("HMS Error:", notification.data);
        document.body.innerHTML += `<p style='color: red;'>HMS Error: ${notification.data.message}</p>`;
      }
    });

    // Join the room
    console.log("Attempting to join room...");
    try {
      await hmsActions.join({
        userName: role === "sister" ? "Sister" : "Brother", 
        authToken: token,
        settings: {
          isAudioMuted: false,
          isVideoMuted: false,
        },
        rememberDeviceSelection: true,
      });
      console.log("✅ Join request sent successfully");
    } catch (joinError) {
      console.error("❌ Join failed:", joinError);
      document.body.innerHTML += `<p style='color: red;'>Join Error: ${joinError.message}</p>`;
      return;
    }

    // Subscribe to store changes
    hms.subscribe((store) => {
      console.log("Store update:", {
        isConnected: store.isConnected,
        peers: Object.keys(store.peers).length,
        localPeer: store.localPeer?.name,
        connectionState: store.connectionState
      });

      const peers = store.peers;
      const container = document.getElementById("video-container");
      
      if (!container) {
        console.error("Video container not found");
        return;
      }

      // Clear existing videos
      container.innerHTML = "";

      // Add videos for all peers
      for (let peerId in peers) {
        const peer = peers[peerId];
        console.log(`Processing peer: ${peer.name} (${peerId})`);
        
        // Check for video track
        if (peer.videoTrack) {
          const videoTrack = store.tracks[peer.videoTrack];
          if (videoTrack && videoTrack.enabled && !videoTrack.degraded) {
            console.log(`Adding video for ${peer.name}`);
            const video = document.createElement("video");
            video.autoplay = true;
            video.playsInline = true;
            video.muted = peer.isLocal; // Mute local video to prevent feedback
            
            // Add peer name overlay
            const wrapper = document.createElement("div");
            wrapper.style.position = "relative";
            wrapper.style.display = "inline-block";
            
            const nameLabel = document.createElement("div");
            nameLabel.textContent = peer.name + (peer.isLocal ? " (You)" : "");
            nameLabel.style.position = "absolute";
            nameLabel.style.bottom = "10px";
            nameLabel.style.left = "10px";
            nameLabel.style.color = "white";
            nameLabel.style.background = "rgba(0,0,0,0.7)";
            nameLabel.style.padding = "5px";
            nameLabel.style.borderRadius = "5px";
            nameLabel.style.fontSize = "12px";
            
            wrapper.appendChild(video);
            wrapper.appendChild(nameLabel);
            container.appendChild(wrapper);
            
            // Attach video track
            hmsActions.attachVideo(videoTrack.id, video);
          }
        }

        // Handle audio tracks (for audio-only participants)
        if (peer.audioTrack && !peer.videoTrack) {
          const audioTrack = store.tracks[peer.audioTrack];
          if (audioTrack && audioTrack.enabled) {
            console.log(`Adding audio-only peer: ${peer.name}`);
            const audioDiv = document.createElement("div");
            audioDiv.style.width = "300px";
            audioDiv.style.height = "200px";
            audioDiv.style.background = "#333";
            audioDiv.style.borderRadius = "10px";
            audioDiv.style.display = "flex";
            audioDiv.style.alignItems = "center";
            audioDiv.style.justifyContent = "center";
            audioDiv.style.color = "white";
            audioDiv.style.position = "relative";
            audioDiv.innerHTML = `
              <div>
                <div style="font-size: 48px;">🎤</div>
                <div style="margin-top: 10px;">${peer.name}${peer.isLocal ? " (You)" : ""}</div>
              </div>
            `;
            container.appendChild(audioDiv);
          }
        }
      }

      // Show connection status
      const statusDiv = document.getElementById("status") || (() => {
        const div = document.createElement("div");
        div.id = "status";
        div.style.margin = "10px";
        div.style.padding = "10px";
        div.style.borderRadius = "5px";
        document.body.insertBefore(div, document.getElementById("video-container"));
        return div;
      })();

      if (store.isConnected) {
        statusDiv.innerHTML = `✅ Connected as ${store.localPeer?.name} | Peers: ${Object.keys(peers).length}`;
        statusDiv.style.background = "#d4edda";
        statusDiv.style.color = "#155724";
      } else {
        statusDiv.innerHTML = `🔄 Connecting... (${store.connectionState || 'unknown'})`;
        statusDiv.style.background = "#fff3cd";
        statusDiv.style.color = "#856404";
      }
    });

  } catch (error) {
    console.error("❌ Unexpected error:", error);
    document.body.innerHTML += `<p style='color: red;'>Unexpected Error: ${error.message}<br>Stack: ${error.stack}</p>`;
  }
});
