const inviteBtn = document.getElementById('invite-btn');
const linkBox = document.getElementById('link-box');
const inviteLink = document.getElementById('invite-link');
const copyBtn = document.getElementById('copy-btn');

const links = [
  'https://rakhi-app.com/room/123abc',
  'https://rakhi-app.com/room/456def',
  'https://rakhi-app.com/room/789ghi'
];

inviteBtn.addEventListener('click', () => {
  const randomLink = links[Math.floor(Math.random() * links.length)];
  inviteLink.value = randomLink;
  inviteBtn.style.display = 'none';
  linkBox.style.display = 'flex';
});

copyBtn.addEventListener('click', () => {
  inviteLink.select();
  document.execCommand('copy');
  copyBtn.textContent = '✅ Copied!';
  setTimeout(() => {
    copyBtn.textContent = '📋 Copy';
  }, 1500);
});
