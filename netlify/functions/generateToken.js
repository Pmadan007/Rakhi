const jwt = require('jsonwebtoken');

exports.handler = async function(event, context) {
  const { user_id = "user", role = "host", room_id = "688ba850a48ca61c46476dcc" } = JSON.parse(event.body || "{}");

  const app_access_key = "688ba7bbbd0dab5f9a013465";
  const app_secret = "e5LfPS3lwoZRq76gt5QVKh6FZOpRx6me1oti17HiulXtz-pEILp3ARb5XD3jze71YTo6TCkYVmndW7FYXhoJ68-9YKAJGWoAMdk_8itncFFYpuxYCh3ZvfJXXXCOkHIT2wx-CoYsLZtSzmNvIfHqeSSMNWxWsUv2hDQdzu2OXSw=";

  const payload = {
    access_key: app_access_key,
    type: "app",
    version: 2,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    room_id,
    user_id,
    role
  };

  const token = jwt.sign(payload, app_secret);

  return {
    statusCode: 200,
    body: JSON.stringify({ token }),
  };
};
