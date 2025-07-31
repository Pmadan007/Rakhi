const axios = require("axios");

exports.handler = async function(event) {
  const { room_id, role, user_name } = JSON.parse(event.body);

  const managementToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTM5OTM4MDIsImV4cCI6MTc1NTIwMzQwMiwianRpIjoiMDdiYzg0YTYtN2ZkZi00MjFlLWE2NTctYjYzYmI0OTVmMDRkIiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE3NTM5OTM4MDIsImFjY2Vzc19rZXkiOiI2ODhiYTdiYmJkMGRhYjVmOWEwMTM0NjUifQ.SPvPZz7GriTQqxAjZ-FXE--P0E1QHLFND6OBl6SMx1w"; // Replace with actual
  const appId = "YOUR_APP_ID"; // Optional, for logs

  try {
    const response = await axios.post("https://api.100ms.live/v2/room-join", {
      room_id,
      user_id: `user_${Math.random().toString(36).substring(2)}`,
      role,
      user_name
    }, {
      headers: {
        Authorization: `Bearer ${managementToken}`,
        "Content-Type": "application/json",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
