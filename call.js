document.addEventListener("DOMContentLoaded", async () => {
  console.log("🚀 DOM loaded");

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("room");
  const role = urlParams.get("role") || "sister";

  console.log(`[🚀 Starting Rakhi call: room=${roomId}, role=${role}]`);

  if (!roomId || !role) {
    alert("Missing room or role in URL");
    return;
  }

  const tokenUrl = `/.netlify/functions/getToken?roomId=${roomId}&role=${role}`;
  console.log("[🔑 Fetching token from]:", tokenUrl);

  let token;
  try {
    const res = await fetch(tokenUrl);
    const data = await res.json();
    console.log("[✅ Token response:]", data);

    if (!data.token) {
      console.error("❌ No token received");
      return;
    }
    token = data.token;
  } catch (err) {
    console.error("❌ Failed to get token", err);
    return;
  }

  // ✅ Access HMS via UMD
  const hmsStore = new window.HMSReactiveStore.HMSStore();
  const hmsActions = new window.HMSReactiveStore.HMSActions(hmsStore);

  await hmsActions.join({
    userName: role === "sister" ? "Sister ❤️" : "Brother 🧿",
    authToken: token,
    settings: {
      isAudioMuted: false,
      isVideoMuted: false,
    },
  });

  hmsStore.subscribe((peers) => {
    const peerList = Object.values(peers);
    const localVideo = document.getElementById("local-video");
    const remoteVideo = document.getElementById("remote-video");

    localVideo.innerHTML = "";
    remoteVideo.innerHTML = "";

    peerList.forEach((peer) => {
      const videoEl = document.createElement("video");
      videoEl.autoplay = true;
      videoEl.playsInline = true;
      videoEl.muted = peer.isLocal;

      hmsActions.attachVideo(peer.id, videoEl);

      if (peer.isLocal) {
        localVideo.appendChild(videoEl);
      } else {
        remoteVideo.appendChild(videoEl);
      }
    });
  }, (selector) => selector.peers);
});
