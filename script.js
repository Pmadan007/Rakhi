const inviteBtn = document.getElementById('invite-btn');
const linkBox = document.getElementById('link-box');
const inviteLink = document.getElementById('invite-link');
const copyBtn = document.getElementById('copy-btn');

const links = [
  'https://rakhi.app/join/123ABC',
  'https://rakhi.app/join/456DEF',
  'https://rakhi.app/join/789GHI'
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
  copyBtn.innerText = 'Copied!';
  setTimeout(() => {
    copyBtn.innerText = 'Copy';
  }, 1500);
});
