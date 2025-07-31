const axios = require("axios");

exports.handler = async function(event) {
  const { room_id, role, user_name } = JSON.parse(event.body);

  const managementToken = "YOUR_MANAGEMENT_TOKEN"; // Replace with actual
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
