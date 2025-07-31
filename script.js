document.addEventListener("DOMContentLoaded", () => {
  const inviteBtn = document.getElementById("invite-btn");
  const inviteSection = document.getElementById("invite-section");
  const inviteLink = document.getElementById("invite-link");
  const copyBtn = document.getElementById("copy-btn");
  const startBtn = document.getElementById("start-btn");

  let roomId = "";

  inviteBtn.addEventListener("click", () => {
    // Generate random room name
    roomId = "rakhi_" + Math.random().toString(36).substr(2, 8);
    const fullLink = `${window.location.origin}/call.html?room=${roomId}`;

    inviteLink.value = fullLink;

    inviteBtn.style.display = "none";
    inviteSection.classList.remove("hidden");
    startBtn.classList.remove("hidden");
  });

  copyBtn.addEventListener("click", () => {
    inviteLink.select();
    document.execCommand("copy");
    copyBtn.innerText = "Copied!";
    setTimeout(() => copyBtn.innerText = "Copy", 1500);
  });

  startBtn.addEventListener("click", () => {
    window.location.href = `call.html?room=${roomId}`;
  });
});
