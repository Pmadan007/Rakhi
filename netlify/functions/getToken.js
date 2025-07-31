// netlify/functions/getToken.js

const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const { roomId, role } = event.queryStringParameters;

  if (!roomId || !role) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
    };
  }

  const ACCESS_KEY = "e5LfPS3lwoZRq76gt5QVKh6FZOpRx6me1oti17HiulXtz-pEILp3ARb5XD3jze71YTo6TCkYVmndW7FYXhoJ68-9YKAJGWoAMdk_8itncFFYpuxYCh3ZvfJXXXCOkHIT2wx-CoYsLZtSzmNvIfHqeSSMNWxWsUv2hDQdzu2OXSw=";
  const APP_SECRET = "688ba7bbbd0dab5f9a013465";

  const payload = {
    access_key: ACCESS_KEY,
    type: "app",
    version: 2,
    room_id: roomId,
    role,
    user_id: "user_" + Math.floor(Math.random() * 10000),
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  };

  const token = jwt.sign(payload, APP_SECRET);

  return {
    statusCode: 200,
    body: JSON.stringify({ token }),
  };
};
