document.addEventListener("DOMContentLoaded", async () => {
  console.log("[📦] DOM loaded");

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("roomId");
  const userType = urlParams.get("userType");
  const userName = userType === "sister" ? "Sister" : "Brother";

  console.log(`[👥] Joining room: ${roomId} as ${userName.toLowerCase()}`);

  try {
    const res = await fetch("/.netlify/functions/getToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, userName })
    });

    const data = await res.json();
    console.log("[🪙] Token response:", data);

    if (!data.token) {
      console.error("❌ No token received");
      return;
    }

    console.log("[🔷] 100ms script loaded. Initializing HMS...");
    window.HMS.init({
      authToken: data.token,
      userName,
      skipPreview: true,
      container: document.getElementById("hms-video")
    });
    console.log("[✅] HMS.init() called successfully");
  } catch (error) {
    console.error("❌ Error during HMS init:", error);
  }
});
