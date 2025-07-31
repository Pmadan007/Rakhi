document.addEventListener("DOMContentLoaded", async () => {
  console.log("[✅] DOM loaded");

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("room") || urlParams.get("roomId");
  const userType = urlParams.get("userType") || "sister"; // default to sister if not provided

  if (!roomId || !userType) {
    console.error("❌ Missing roomId or userType in URL");
    return;
  }

  console.log(`[👥] Joining room: ${roomId} as ${userType}`);

  try {
    const response = await fetch("/.netlify/functions/getToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, userType })
    });

    const data = await response.json();
    console.log("[🪙] Token response:", data);

    if (!data.token) {
      console.error("❌ No token received");
      return;
    }

    const hms = window.HMS;
    if (!hms) {
      console.error("❌ 100ms SDK not loaded");
      return;
    }

    const hmsConfig = {
      authToken: data.token,
      userName: userType === "sister" ? "Sister" : "Brother"
    };

    const join = await hms.prebuilt.join(hmsConfig);
    console.log("[🎥] Joined room successfully");
  } catch (error) {
    console.error("❌ Error during token fetch or room join:", error);
  }
});
