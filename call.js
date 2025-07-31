document.addEventListener("DOMContentLoaded", async () => {
  console.log("[🟡] DOM loaded");

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("room");
  const role = urlParams.get("role") || "brother"; // fallback role
  const userName = role === "sister" ? "Sister" : "Brother";

  if (!roomId) {
    console.error("❌ No roomId provided in URL");
    return;
  }

  console.log(`[🔁] Joining room: ${roomId} as ${role}`);

  try {
    const res = await fetch("/.netlify/functions/getToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ roomId, role, userName })
    });

    const data = await res.json();
    console.log("[🟢] Token response:", data);

    if (!data.token) {
      console.error("❌ No token received");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/100mslive@latest";
    script.async = true;
    script.onload = () => {
      console.log("[🔷] 100ms script loaded. Initializing HMS...");
      window.HMS.init({
        authToken: data.token,
        userName,
        skipPreview: true
      });
    };

    document.body.appendChild(script);
  } catch (err) {
    console.error("❌ Fetch or token error:", err);
  }
});
