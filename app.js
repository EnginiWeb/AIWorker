
const LS = {
  WORKER: 'engini.selectedWorker',
  SKILLS: 'engini.selectedSkills',
  PRICING: 'engini.pricing',
  SIGNUP: 'engini.signup',
  THEME: 'theme',
  AVATAR: 'engini.workerAvatar'
};

const STEP_URLS = { 1: 'index.html', 2: 'skills.html', 3: 'onboard.html', 4: 'chat.html' };


function getLS(key, fallback = null) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function setLS(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function uiAvatar(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'AI')}&background=E6EEF8&color=1B2A4A&size=96&bold=true`;
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('show');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('show');
}

function setActiveProgressByPath() {
  const path = (location.pathname || '').toLowerCase();
  let step = 1;
  if (path.includes('skills')) step = 2;
  else if (path.includes('onboard')) step = 3;
  else if (path.includes('chat') || path.includes('workspace')) step = 4;
  
  document.querySelectorAll('.progress [data-step]').forEach(el => {
    el.classList.toggle('active', Number(el.dataset.step) === step);
  });
}

function wireProgressNav() {
  document.querySelectorAll('.progress [data-step]').forEach(el => {
    el.addEventListener('click', () => {
      const step = Number(el.dataset.step);
      const url = STEP_URLS[step] || 'index.html';
      window.location.href = url;
    });
  });
}

function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  if (!themeToggle) return;

  if (localStorage.getItem(LS.THEME) === 'dark') {
    html.classList.add('dark-mode');
    themeToggle.textContent = 'Light Mode';
  }

  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark-mode');
    const isDark = html.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem(LS.THEME, isDark ? 'dark' : 'light');
  });
}

function setupModalBackdrops() {
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('show');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveProgressByPath();
  wireProgressNav();
  initTheme();
  setupModalBackdrops();
  
  const btnTalkSales = document.getElementById('btnTalkSales');
  if (btnTalkSales) {
    btnTalkSales.onclick = () => openModal('salesModal');
  }
});

window.ENG = {
  LS,
  STEP_URLS,
  getLS,
  setLS,
  uiAvatar,
  openModal,
  closeModal,
  setActiveProgressByPath,
  wireProgressNav,
  initTheme
};