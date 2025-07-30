document.addEventListener("DOMContentLoaded", () => {
  const inviteBtn = document.getElementById("invite-btn");
  const inviteSection = document.getElementById("invite-section");
  const inviteLink = document.getElementById("invite-link");
  const copyBtn = document.getElementById("copy-btn");

  inviteBtn.addEventListener("click", () => {
    const links = [
      "https://rakhi.zepto/invite/abc123",
      "https://rakhi.zepto/invite/xyz789",
      "https://rakhi.zepto/invite/mno456"
    ];
    inviteLink.value = links[Math.floor(Math.random() * links.length)];
    inviteBtn.style.display = "none";
    inviteSection.classList.remove("hidden");
  });

  copyBtn.addEventListener("click", () => {
    inviteLink.select();
    document.execCommand("copy");
    copyBtn.innerText = "Copied!";
    setTimeout(() => copyBtn.innerText = "Copy", 1500);
  });
});
