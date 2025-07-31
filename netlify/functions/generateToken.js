const fetch = require("node-fetch");

exports.handler = async function (event) {
  const { room_id, user_id, role } = JSON.parse(event.body || "{}");

  const management_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTM5OTIzNjQsImV4cCI6MTc1NTIwMTk2NCwianRpIjoiNDM2OTIwZDItZDkxMy00NWM5LWFmOWEtZmZhNWYxMWFiZWVkIiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE3NTM5OTIzNjQsImFjY2Vzc19rZXkiOiI2ODhiYTdiYmJkMGRhYjVmOWEwMTM0NjUifQ.ruf-t9UsgpCeN1DDd9s70t3VCS0b3qjZk-pE_5O3p-Y";

  const response = await fetch("https://api.100ms.live/v2/room-tokens", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${management_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      room_id,
      user_id,
      role: role || "guest",
    }),
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
