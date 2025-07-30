document.addEventListener("DOMContentLoaded", () => {
  const inviteBtn = document.getElementById("invite-btn");
  const inviteSection = document.getElementById("invite-section");
  const inviteLink = document.getElementById("invite-link");
  const copyBtn = document.getElementById("copy-btn");

  inviteBtn.addEventListener("click", () => {
    // Simulate invite link
    const codes = ["https://rakhi.app/invite/abc123", "https://rakhi.app/invite/xyz789", "https://rakhi.app/invite/mno456"];
    const randomLink = codes[Math.floor(Math.random() * codes.length)];
    inviteLink.value = randomLink;

    // Hide invite button and show link + start
    inviteBtn.style.display = "none";
    inviteSection.classList.remove("hidden");
  });

  copyBtn.addEventListener("click", () => {
    inviteLink.select();
    document.execCommand("copy");
    copyBtn.innerText = "Copied!";
    setTimeout(() => (copyBtn.innerText = "Copy"), 1500);
  });
});
