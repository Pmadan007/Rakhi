document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM loaded");

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("room");
  const role = urlParams.get("role") || "sister";

  console.log(`[${new Date().toLocaleTimeString()}] Joining room: ${roomId} as ${role}`);

  const tokenUrl = `/netlify/functions/getToken?roomId=${roomId}&role=${role}`;
  const tokenRes = await fetch(tokenUrl);
  const tokenJson = await tokenRes.json();

  console.log(`[${new Date().toLocaleTimeString()}] Token response:`, tokenJson);

  if (!tokenJson.token) {
    console.error("❌ No token received");
    return;
  }

  const token = tokenJson.token;

  const hms = new HMSReactiveStore.HMSStore();
  const hmsActions = new HMSReactiveStore.HMSActions(hms);
  const hmsNotifications = new HMSReactiveStore.HMSNotifications(hms);

  await hmsActions.join({
    userName: role === "sister" ? "Sister" : "Brother",
    authToken: token,
    settings: {
      isAudioMuted: false,
      isVideoMuted: false,
    },
    rememberDeviceSelection: true,
  });

  hms.subscribe((store) => {
    const peers = store.peers;
    const container = document.getElementById("video-container");
    container.innerHTML = "";

    for (let peerId in peers) {
      const peer = peers[peerId];
      const videoTrack = store.videoTracks[peer.videoTrack];
      if (videoTrack && videoTrack.enabled) {
        const video = document.createElement("video");
        video.autoplay = true;
        video.playsInline = true;
        hmsActions.attachVideo(videoTrack.id, video);
        container.appendChild(video);
      }
    }
  }, (state) => state);
});
