document.addEventListener("DOMContentLoaded", () => {
  const inviteBtn = document.getElementById("invite-btn");
  const inviteSection = document.getElementById("invite-section");
  const inviteLink = document.getElementById("invite-link");
  const copyBtn = document.getElementById("copy-btn");
  const startBtn = document.getElementById("start-btn");

  let roomId = "";

  function generateRoomId() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  inviteBtn.addEventListener("click", () => {
    roomId = generateRoomId();
    const fullLink = `${window.location.origin}/call.html?room=${roomId}`;
    inviteLink.value = fullLink;

    inviteBtn.style.display = "none";
    inviteSection.classList.remove("hidden");
    startBtn.classList.remove("hidden");
  });

  copyBtn.addEventListener("click", () => {
    inviteLink.select();
    navigator.clipboard.writeText(inviteLink.value).then(() => {
      copyBtn.innerText = "Copied!";
      setTimeout(() => (copyBtn.innerText = "Copy"), 2000);
    });
  });

  startBtn.addEventListener("click", () => {
    if (roomId) {
      window.location.href = `call.html?room=${roomId}`;
    }
  });
});  startBtn.addEventListener("click", () => {
    if (roomId) {
      window.location.href = `call.html?room=${roomId}`;
    }
  });
});    if (roomId) {
      window.location.href = `call.html?room=${roomId}`;
    }
  });
});

