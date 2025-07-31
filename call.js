document.addEventListener("DOMContentLoaded", async () => {
  console.log("[log] DOM loaded");

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("room");
  const role = urlParams.get("role") || "brother";

  console.log(`[log] Joining room: ${roomId} as ${role}`);

  const tokenUrl = `/netlify/functions/getToken?roomId=${roomId}&role=${role}`;
  try {
    const response = await fetch(tokenUrl);
    const data = await response.json();
    console.log("[log] Token response:", data);

    if (!data.token) {
      console.error("❌ No token received");
      return;
    }

    const hms = new window.HMS.SDK.HMSRoom();
    await hms.join({
      userName: role === "brother" ? "Brother" : "Sister",
      authToken: data.token,
      settings: {
        isAudioMuted: false,
        isVideoMuted: false,
      }
    });

    hms.on("peer-joined", peer => {
      console.log("Peer joined:", peer.name);
    });

    hms.on("track-added", (track, peer) => {
      if (track.type === "video") {
        const video = document.createElement("video");
        video.autoplay = true;
        video.muted = peer.isLocal;
        document.body.appendChild(video);
        hms.attachVideo(track, video);
      }
    });

    console.log("✅ Joined room successfully");
  } catch (err) {
    console.error("❌ Error joining room:", err);
  }
});      authToken: data.token,
      userName: userType === "sister" ? "Sister" : "Brother"
    };

    const join = await hms.prebuilt.join(hmsConfig);
    console.log("[🎥] Joined room successfully");
  } catch (error) {
    console.error("❌ Error during token fetch or room join:", error);
  }
});
