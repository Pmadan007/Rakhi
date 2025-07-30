// Freeze video on last frame
document.getElementById("bg-video").onended = function () {
  this.pause();
  this.currentTime = this.duration;
};

// Show invite link + copy + start button
document.getElementById("invite-btn").addEventListener("click", () => {
  document.getElementById("invite-btn").classList.add("hidden");
  document.getElementById("invite-box").classList.remove("hidden");
});

// Copy to clipboard
document.getElementById("copy-btn").addEventListener("click", () => {
  const linkInput = document.getElementById("invite-link");
  linkInput.select();
  document.execCommand("copy");
  alert("Link copied!");
});
