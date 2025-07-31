// call.js
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");
const userName = urlParams.get("name") || "Sibling";

const hms = new window.HMSReactiveStore.HMSReactiveStore();
const hmsActions = hms.getActions();
const hmsStore = hms.getStore();

async function joinRoom() {
  try {
    await hmsActions.join({
      userName,
      authToken: token,
      settings: {
        isAudioMuted: false,
        isVideoMuted: false,
      },
    });
  } catch (err) {
    console.error("Join failed:", err);
  }
}

hmsStore.subscribe(
  (peers) => {
    const container = document.getElementById("video-container");
    container.innerHTML = ""; // Clear existing tiles

    peers.forEach((peer) => {
      const videoEl = document.createElement("video");
      videoEl.autoplay = true;
      videoEl.playsInline = true;

      hmsActions.attachVideo(peer.videoTrack, videoEl);
      container.appendChild(videoEl);
    });
  },
  (state) => state.peers
);

joinRoom();
