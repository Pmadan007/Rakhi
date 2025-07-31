const axios = require("axios");
const jwt = require("jsonwebtoken");

exports.handler = async function (event, context) {
  try {
    const { roomId, role, userName } = JSON.parse(event.body);

    if (!roomId || !role || !userName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" })
      };
    }

    // 🔐 Your 100ms credentials
    const appAccessKey = "688ba7bbbd0dab5f9a013465";
    const appSecret = "e5LfPS3lwoZRq76gt5QVKh6FZOpRx6me1oti17HiulXtz-pEILp3ARb5XD3jze71YTo6TCkYVmndW7FYXhoJ68-9YKAJGWoAMdk_8itncFFYpuxYCh3ZvfJXXXCOkHIT2wx-CoYsLZtSzmNvIfHqeSSMNWxWsUv2hDQdzu2OXSw=";

    const payload = {
      access_key: appAccessKey,
      room_id: roomId,
      user_id: `user_${Date.now()}`,
      role: role,
      type: "app",
      version: 2
    };

    const token = jwt.sign(payload, appSecret, {
      algorithm: "HS256",
      expiresIn: "1h"
    });

    const response = await axios.post("https://api.100ms.live/v2/room/join", {
      user_name: userName,
      auth_token: token
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ token: response.data.token })
    };
  } catch (error) {
    console.error("❌ getToken error:", error.response?.data || error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Token generation failed",
        details: error.response?.data || error.message
      })
    };
  }
};    console.error("Error getting token:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Token fetch failed", details: err.message }),
    };
  }
};
