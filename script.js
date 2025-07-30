document.addEventListener("DOMContentLoaded", () => {
  const inviteBtn = document.getElementById("invite-btn");
  const inviteSection = document.getElementById("invite-section");
  const inviteLink = document.getElementById("invite-link");
  const copyBtn = document.getElementById("copy-btn");

  inviteBtn.addEventListener("click", () => {
    // Generate random invite link
    const links = [
      "https://rakhi.app/invite/abc123",
      "https://rakhi.app/invite/xyz789",
      "https://rakhi.app/invite/mno456"
    ];
    const random = links[Math.floor(Math.random() * links.length)];
    inviteLink.value = random;

    // Hide the invite button, show the link and start button
    inviteBtn.classList.add("hidden");
    inviteSection.classList.remove("hidden");
  });

  copyBtn.addEventListener("click", () => {
    inviteLink.select();
    document.execCommand("copy");
    copyBtn.innerText = "Copied!";
    setTimeout(() => {
      copyBtn.innerText = "Copy";
    }, 1500);
  });
});
