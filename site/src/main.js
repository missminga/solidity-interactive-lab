import './style.css';
import { renderHome, initHome } from './pages/home.js';
import { renderBlockchain, initBlockchain } from './pages/blockchain.js';
import { renderMining, initMining, cleanupMining } from './pages/mining.js';
import { renderNetwork, initNetwork } from './pages/network.js';
import { renderKeys, initKeys } from './pages/keys.js';
import { renderModels, initModels } from './pages/models.js';
import { renderContracts, initContracts } from './pages/contracts.js';
import { renderUsecases, initUsecases } from './pages/usecases.js';

const pages = {
  home: { render: renderHome, init: initHome },
  blockchain: { render: renderBlockchain, init: initBlockchain },
  mining: { render: renderMining, init: initMining, cleanup: cleanupMining },
  network: { render: renderNetwork, init: initNetwork },
  keys: { render: renderKeys, init: initKeys },
  models: { render: renderModels, init: initModels },
  contracts: { render: renderContracts, init: initContracts },
  usecases: { render: renderUsecases, init: initUsecases }
};

const pageOrder = ['blockchain', 'mining', 'network', 'keys', 'models', 'contracts', 'usecases'];

let currentPage = 'home';
let completedPages = new Set();

function loadProgress() {
  try {
    const saved = localStorage.getItem('blockchain-learning-progress');
    if (saved) {
      completedPages = new Set(JSON.parse(saved));
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
}

function saveProgress() {
  try {
    localStorage.setItem('blockchain-learning-progress', JSON.stringify([...completedPages]));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

function updateProgress() {
  const fill = document.getElementById('progress-fill');
  const text = document.getElementById('progress-text');
  
  if (fill && text) {
    const total = pageOrder.length;
    const completed = completedPages.size;
    const percentage = (completed / total) * 100;
    
    fill.style.width = `${percentage}%`;
    text.textContent = `${completed} / ${total}`;
  }
  
  document.querySelectorAll('.nav-list a').forEach(link => {
    const page = link.dataset.page;
    if (page && pageOrder.includes(page) && completedPages.has(page)) {
      link.classList.add('completed');
    } else {
      link.classList.remove('completed');
    }
  });
}

function navigateTo(pageName) {
  if (!pages[pageName]) {
    console.error(`Page not found: ${pageName}`);
    return;
  }
  
  if (pages[currentPage]?.cleanup) {
    pages[currentPage].cleanup();
  }
  
  currentPage = pageName;
  
  if (pageOrder.includes(pageName)) {
    completedPages.add(pageName);
    saveProgress();
  }
  
  const content = document.getElementById('content');
  if (content) {
    content.innerHTML = pages[pageName].render(navigateTo);
    pages[pageName].init(navigateTo);
  }
  
  document.querySelectorAll('.nav-list a').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageName) {
      link.classList.add('active');
    }
  });
  
  updateProgress();
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  const hash = pageName === 'home' ? '' : `#${pageName}`;
  history.pushState({ page: pageName }, '', hash || window.location.pathname);
}

function init() {
  loadProgress();
  
  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.dataset.page);
    });
  });
  
  const hash = window.location.hash.slice(1);
  if (hash && pages[hash]) {
    navigateTo(hash);
  } else {
    navigateTo('home');
  }
  
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
      navigateTo(e.state.page);
    } else {
      navigateTo('home');
    }
  });
  
  updateProgress();
}

document.addEventListener('DOMContentLoaded', init);
