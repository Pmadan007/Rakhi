const debug = (msg) => {
  const el = document.getElementById("debug");
  el.textContent += `[${new Date().toLocaleTimeString()}] ${msg}\n`;
};

window.addEventListener("DOMContentLoaded", async () => {
  debug("DOM loaded");

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("room");
  const role = urlParams.get("role") || "brother";
  const name = role === "sister" ? "Sister" : "Brother";

  if (!roomId) {
    debug("❌ No room ID found in URL");
    return;
  }

  debug(`Joining room: ${roomId} as ${role}`);

  try {
    const res = await fetch(`/.netlify/functions/getToken?roomId=${roomId}&role=${role}&userName=${name}`);
    const data = await res.json();
    debug(`Token response: ${JSON.stringify(data)}`);

    if (!data.token) {
      debug("❌ No token received");
      return;
    }

    const hms = new HMSReactiveStore.HMSRoomProvider();
    const config = {
      userName: name,
      authToken: data.token,
      settings: {
        isAudioMuted: true,
        isVideoMuted: true
      },
      displayConfig: {
        showLeaveRoomButton: true
      },
      joinConfig: {
        roomId: roomId
      }
    };

    debug("🟢 Initializing 100ms iframe...");
    hms.join(config);
    document.getElementById("meeting-container").appendChild(hms.getIframe());

  } catch (err) {
    debug(`❌ Error joining room: ${err.message}`);
  }
});
