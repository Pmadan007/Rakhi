const links = [
  "https://rakhi-app.com/room/alpha12",
  "https://rakhi-app.com/room/bliss99",
  "https://rakhi-app.com/room/bond22"
];

document.getElementById("generate-link-btn").addEventListener("click", () => {
  const randomLink = links[Math.floor(Math.random() * links.length)];
  const roomLink = document.getElementById("room-link");

  roomLink.value = randomLink;
  document.getElementById("link-container").classList.remove("hidden");
});

document.getElementById("copy-btn").addEventListener("click", () => {
  const roomLink = document.getElementById("room-link");
  roomLink.select();
  roomLink.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(roomLink.value);
  alert("Link copied to clipboard!");
});
