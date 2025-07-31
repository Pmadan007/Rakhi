document.addEventListener("DOMContentLoaded", () => {
  const inviteBtn = document.getElementById("invite-btn");
  const inviteSection = document.getElementById("invite-section");
  const inviteLink = document.getElementById("invite-link");
  const copyBtn = document.getElementById("copy-btn");
  const startBtn = document.getElementById("start-btn");

  let roomId = "";

  inviteBtn.addEventListener("click", async () => {
    const room_name = "rakhi_" + Math.random().toString(36).substring(2, 10);
    
    try {
      const res = await fetch("/.netlify/functions/createRoom", {
        method: "POST",
        body: JSON.stringify({ room_name }),
      });

      const data = await res.json();
      console.log("Room creation response:", data); // helpful for debugging

      if (!data.id) {
        alert("Room creation failed. Please try again.");
        return;
      }

      roomId = data.id;
      const fullLink = `${window.location.origin}/call.html?room=${roomId}`;
      inviteLink.value = fullLink;

      inviteBtn.style.display = "none";
      inviteSection.classList.remove("hidden");
      startBtn.classList.remove("hidden");
    } catch (err) {
      console.error("Room creation error:", err);
      alert("Failed to create room. Please check console.");
    }
  });

  copyBtn.addEventListener("click", () => {
    inviteLink.select();
    document.execCommand("copy");
    copyBtn.innerText = "Copied!";
    setTimeout(() => (copyBtn.innerText = "Copy"), 1500);
  });

  startBtn.addEventListener("click", () => {
    if (roomId) {
      window.location.href = `call.html?room=${roomId}`;
    }
  });
});    }
  });
});
