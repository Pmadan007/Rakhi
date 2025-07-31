const fetch = require("node-fetch");

exports.handler = async function (event) {
  const { room_name } = JSON.parse(event.body || "{}");

  const app_secret = "e5LfPS3lwoZRq76gt5QVKh6FZOpRx6me1oti17HiulXtz-pEILp3ARb5XD3jze71YTo6TCkYVmndW7FYXhoJ68-9YKAJGWoAMdk_8itncFFYpuxYCh3ZvfJXXXCOkHIT2wx-CoYsLZtSzmNvIfHqeSSMNWxWsUv2hDQdzu2OXSw=";
  const template_id = "688ba850033903926e619679";

  const response = await fetch("https://api.100ms.live/v2/rooms", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${app_secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: room_name,
      description: "Raksha Bandhan Room",
      template_id: template_id,
    }),
  });

  const data = await response.json();
  console.log("Room creation response:", data); // 👈 helpful debug line

  return {
    statusCode: 200,
    body: JSON.stringify({ id: data.id }), // only send required data
  };
};
