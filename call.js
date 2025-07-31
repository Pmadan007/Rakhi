document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM loaded");

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("room");
  const role = urlParams.get("role") || "sister";

  if (!roomId) {
    alert("Missing room ID in URL");
    return;
  }

  console.log(`[${new Date().toLocaleTimeString()}] Joining room: ${roomId} as ${role}`);

  try {
    const res = await fetch(`/netlify/functions/getToken?roomId=${roomId}&role=${role}`);
    const data = await res.json();
    console.log(`[${new Date().toLocaleTimeString()}] Token response:`, data);

    if (!data.token) {
      document.getElementById("video-container").innerText = "❌ Failed to get token";
      return;
    }

    const hms = new HMSReactiveStore.HMSStore();
    const hmsActions = new HMSReactiveStore.HMSActions(hms);

    // Join the room with audio/video enabled
    await hmsActions.join({
      userName: role === "sister" ? "Sister" : "Brother",
      authToken: data.token,
      settings: {
        isAudioMuted: false,
        isVideoMuted: false,
      },
      rememberDeviceSelection: true,
    });

    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "Waiting for peers...";

    hms.subscribe((state) => {
      const peers = Object.values(state.peers);
      videoContainer.innerHTML = "";

      peers.forEach((peer) => {
        const trackId = peer.videoTrack;
        const videoTrack = state.videoTracks[trackId];

        if (trackId && videoTrack?.enabled) {
          let video = document.querySelector(`[data-peer="${peer.id}"]`);
          if (!video) {
            video = document.createElement("video");
            video.setAttribute("data-peer", peer.id);
            video.autoplay = true;
            video.muted = peer.isLocal; // Mute local to avoid feedback
            video.playsInline = true;
            videoContainer.appendChild(video);
            hmsActions.attachVideo(trackId, video);
          }
        }
      });
    });
  } catch (err) {
    console.error("❌ Error during setup:", err);
    document.getElementById("video-container").innerText = "❌ Error loading video call";
  }
});
