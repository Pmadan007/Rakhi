const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

exports.handler = async function (event) {
  const { room_name } = JSON.parse(event.body || "{}");

  if (!room_name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing room_name" }),
    };
  }

  // ✅ 100ms credentials
  const accessKey = "688ba7bbbd0dab5f9a013465";
  const secret = "e5LfPS3lwoZRq76gt5QVKh6FZOpRx6me1oti17HiulXtz-pEILp3ARb5XD3jze71YTo6TCkYVmndW7FYXhoJ68-9YKAJGWoAMdk_8itncFFYpuxYCh3ZvfJXXXCOkHIT2wx-CoYsLZtSzmNvIfHqeSSMNWxWsUv2hDQdzu2OXSw=";
  const template_id = "688ba850033903926e619679";

  // ⏳ JWT valid for 24 hours
  const payload = {
    access_key: accessKey,
    type: "management",
    version: 2,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    jti: Math.random().toString(36).substring(2),
  };

  const token = jwt.sign(payload, secret);

  try {
    const response = await fetch("https://api.100ms.live/v2/rooms", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: room_name,
        description: "Raksha Bandhan Room",
        template_id: template_id,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Room creation failed", details: data }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error", message: err.message }),
    };
  }
};      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Room creation failed", details: data }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ id: data.id }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal error", message: err.message }),
    };
  }
};
