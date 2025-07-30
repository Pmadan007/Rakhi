document.addEventListener("DOMContentLoaded", () => {
  const inviteBtn = document.getElementById("invite-btn");
  const inviteSection = document.getElementById("invite-section");
  const inviteLink = document.getElementById("invite-link");
  const copyBtn = document.getElementById("copy-btn");
  const startBtn = document.getElementById("start-btn");
  const video = document.getElementById("bg-video");

  // Freeze video on last frame
  video.addEventListener("timeupdate", () => {
    if (video.currentTime >= video.duration - 0.1) {
      video.pause();
    }
  });

  // Invite Button logic
  inviteBtn.addEventListener("click", () => {
    const codes = [
      "https://rakhi.app/invite/abc123",
      "https://rakhi.app/invite/xyz789",
      "https://rakhi.app/invite/mno456"
    ];
    const randomLink = codes[Math.floor(Math.random() * codes.length)];
    inviteLink.value = randomLink;

    // Toggle visibility
    inviteBtn.style.display = "none";
    inviteSection.classList.remove("hidden");
    startBtn.style.display = "block";
  });

  // Copy button logic
  copyBtn.addEventListener("click", () => {
    inviteLink.select();
    document.execCommand("copy");
    copyBtn.innerText = "Copied!";
    setTimeout(() => (copyBtn.innerText = "Copy"), 1500);
  });
});
