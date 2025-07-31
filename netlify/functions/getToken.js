const jwt = require("jsonwebtoken");
const axios = require("axios");

exports.handler = async function (event, context) {
  const { room_id, user_id, role } = JSON.parse(event.body || "{}");

  if (!room_id || !user_id || !role) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
    };
  }

  const appAccessKey = "688ba7bbbd0dab5f9a013465";
  const appSecret = "e5LfPS3lwoZRq76gt5QVKh6FZOpRx6me1oti17HiulXtz-pEILp3ARb5XD3jze71YTo6TCkYVmndW7FYXhoJ68-9YKAJGWoAMdk_8itncFFYpuxYCh3ZvfJXXXCOkHIT2wx-CoYsLZtSzmNvIfHqeSSMNWxWsUv2hDQdzu2OXSw=";
  const payload = {
    access_key: appAccessKey,
    room_id,
    user_id,
    role,
    type: "app",
    version: 2,
  };

  const token = jwt.sign(payload, appSecret, { algorithm: "HS256", expiresIn: "1h" });

  try {
    const response = await axios.post("https://api.100ms.live/v2/meeting/tokens", {
      token,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ token: response.data.token }),
    };
  } catch (err) {
    console.error("Error getting token:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Token fetch failed", details: err.message }),
    };
  }
};
