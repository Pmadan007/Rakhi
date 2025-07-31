document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("room");
  const role = urlParams.get("role") || "brother"; // default to brother

  if (!roomId) {
    alert("Room ID missing!");
    return;
  }

  const userName = role === "sister" ? "Sister" : "Brother";

  try {
    const res = await fetch("/.netlify/functions/getToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room_id: roomId, role, user_name: userName }),
    });

    const data = await res.json();
    if (!data.token) {
      console.error("Token fetch failed", data);
      alert("Unable to fetch token.");
      return;
    }

    const iframe = document.getElementById("jitsi-frame");
    iframe.src = `https://rakhi-celebrate.app.100ms.live/preview/${roomId}?auth_token=${data.token}&skip_preview=true`;
  } catch (err) {
    console.error("Error loading call:", err);
  }
});
