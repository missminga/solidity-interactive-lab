import { sha256 } from '../utils/crypto.js';

let miningInterval = null;
let isMining = false;

export function renderMining() {
  return `
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">⛏️ 挖矿与共识</h1>
        <p class="page-subtitle">理解工作量证明如何保护区块链</p>
      </div>
      
      <div class="card">
        <h3 class="card-title">🤔 谁有权添加新区块？</h3>
        <p>
          在去中心化网络中，没有中央权威决定谁可以写入账本。
          那么如何防止恶意节点随意添加虚假区块呢？
        </p>
        <p style="margin-top: 1rem;">
          答案是：<span class="highlight">让添加区块变得"昂贵"</span>——需要付出计算资源。
          这就是<strong>工作量证明（Proof of Work, PoW）</strong>。
        </p>
      </div>
      
      <div class="card">
        <h3 class="card-title">🎲 Nonce 与难度目标</h3>
        <p>
          在 PoW 中，矿工需要找到一个数字（叫做 <span class="highlight">nonce</span>），
          使得区块数据 + nonce 的哈希值满足某个条件——比如以若干个零开头。
        </p>
        <div class="info-box" style="margin-top: 1rem;">
          <strong>难度</strong>：要求哈希以更多的零开头 = 更难找到有效的 nonce = 需要更多计算
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">🎮 挖矿模拟器</h3>
        <p style="margin-bottom: 1rem;">
          调整难度，点击"开始挖矿"，观察寻找有效 nonce 的过程
        </p>
        
        <div class="demo-container">
          <div class="demo-title">区块数据</div>
          <input type="text" class="block-input" id="mining-data" value="Alice 转账 100 给 Bob" style="margin-bottom: 1rem;">
          
          <div class="block-field">
            <span class="block-label">难度（哈希需以几个 0 开头）：</span>
            <input type="range" class="difficulty-slider" id="difficulty-slider" min="1" max="5" value="2">
            <span id="difficulty-value" style="margin-left: 0.5rem; color: var(--accent); font-weight: bold;">2</span>
          </div>
          
          <div class="mining-container">
            <div style="color: var(--text-secondary); margin-bottom: 0.5rem;">当前尝试的 Nonce</div>
            <div class="nonce-display" id="nonce-display">0</div>
            
            <div class="hash-display" id="hash-display">
              点击"开始挖矿"看看会发生什么...
            </div>
            
            <div class="btn-group" style="justify-content: center;">
              <button class="btn btn-primary" id="start-mining">⛏️ 开始挖矿</button>
              <button class="btn btn-danger" id="stop-mining" disabled>⏹️ 停止</button>
            </div>
          </div>
          
          <div class="mining-stats">
            <div class="stat-box">
              <div class="stat-value" id="attempts-count">0</div>
              <div class="stat-label">尝试次数</div>
            </div>
            <div class="stat-box">
              <div class="stat-value" id="hash-rate">0</div>
              <div class="stat-label">哈希/秒</div>
            </div>
            <div class="stat-box">
              <div class="stat-value" id="time-elapsed">0.0s</div>
              <div class="stat-label">耗时</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">⚡ 权益证明（PoS）简介</h3>
        <p>
          以太坊在 2022 年从 PoW 转向了<span class="highlight">权益证明（Proof of Stake）</span>。
        </p>
        
        <table class="comparison-table" style="margin-top: 1rem;">
          <tr>
            <th>方面</th>
            <th>工作量证明 (PoW)</th>
            <th>权益证明 (PoS)</th>
          </tr>
          <tr>
            <td>代表</td>
            <td>比特币</td>
            <td>以太坊 2.0</td>
          </tr>
          <tr>
            <td>资源消耗</td>
            <td>大量电力和算力</td>
            <td>抵押的代币</td>
          </tr>
          <tr>
            <td>出块权</td>
            <td>算力竞争</td>
            <td>随机选择验证者</td>
          </tr>
          <tr>
            <td>惩罚机制</td>
            <td>浪费电费</td>
            <td>罚没质押金（Slashing）</td>
          </tr>
          <tr>
            <td>环保性</td>
            <td>高能耗</td>
            <td>能耗降低 ~99.95%</td>
          </tr>
        </table>
        
        <div class="info-box" style="margin-top: 1rem;">
          <strong>核心思想相同</strong>：无论 PoW 还是 PoS，目标都是让作恶代价高昂——
          要么浪费算力/电力，要么损失质押的资产。
        </div>
      </div>
      
      <div class="quiz-container">
        <h3 class="quiz-title">📝 小测验</h3>
        <p class="quiz-question">为什么说"挖矿"保护了区块链？</p>
        <div class="quiz-options" id="quiz-options">
          <div class="quiz-option" data-answer="a">A. 因为挖矿产生新的比特币</div>
          <div class="quiz-option" data-answer="b">B. 因为篡改历史需要重新计算所有后续区块的工作量证明，成本极高</div>
          <div class="quiz-option" data-answer="c">C. 因为矿工会检查每笔交易</div>
          <div class="quiz-option" data-answer="d">D. 因为只有政府批准的矿工才能挖矿</div>
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
      </div>
      
      <div class="page-nav">
        <button class="btn btn-secondary" data-page="blockchain">← 区块与链</button>
        <button class="btn btn-primary" data-page="network">下一章：去中心化 →</button>
      </div>
    </div>
  `;
}

export function initMining(navigateTo) {
  const difficultySlider = document.getElementById('difficulty-slider');
  const difficultyValue = document.getElementById('difficulty-value');
  const startBtn = document.getElementById('start-mining');
  const stopBtn = document.getElementById('stop-mining');
  const nonceDisplay = document.getElementById('nonce-display');
  const hashDisplay = document.getElementById('hash-display');
  const attemptsCount = document.getElementById('attempts-count');
  const hashRate = document.getElementById('hash-rate');
  const timeElapsed = document.getElementById('time-elapsed');
  const miningData = document.getElementById('mining-data');
  
  difficultySlider?.addEventListener('input', (e) => {
    difficultyValue.textContent = e.target.value;
    if (!isMining) {
      hashDisplay.innerHTML = '点击"开始挖矿"看看会发生什么...';
    }
  });
  
  async function mine() {
    if (isMining) return;
    isMining = true;
    
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
    const difficulty = parseInt(difficultySlider.value);
    const target = '0'.repeat(difficulty);
    const data = miningData.value;
    
    let nonce = 0;
    let attempts = 0;
    const startTime = Date.now();
    
    const update = async () => {
      if (!isMining) return;
      
      for (let i = 0; i < 50; i++) {
        const hash = await sha256(data + nonce);
        attempts++;
        
        nonceDisplay.textContent = nonce;
        attemptsCount.textContent = attempts.toLocaleString();
        
        const elapsed = (Date.now() - startTime) / 1000;
        timeElapsed.textContent = elapsed.toFixed(1) + 's';
        hashRate.textContent = Math.round(attempts / elapsed);
        
        const highlightedHash = hash.replace(
          new RegExp(`^(0{0,${difficulty}})`),
          '<span style="color: var(--secondary);">$1</span>'
        );
        
        if (hash.startsWith(target)) {
          hashDisplay.innerHTML = `
            <div style="color: var(--secondary); font-weight: bold; margin-bottom: 0.5rem;">
              ✅ 找到了！
            </div>
            ${highlightedHash}
          `;
          isMining = false;
          startBtn.disabled = false;
          stopBtn.disabled = true;
          return;
        }
        
        hashDisplay.innerHTML = highlightedHash;
        nonce++;
      }
      
      if (isMining) {
        miningInterval = setTimeout(update, 10);
      }
    };
    
    update();
  }
  
  function stopMining() {
    isMining = false;
    if (miningInterval) {
      clearTimeout(miningInterval);
    }
    startBtn.disabled = false;
    stopBtn.disabled = true;
    hashDisplay.innerHTML += '<div style="color: var(--accent); margin-top: 0.5rem;">⏹️ 已停止</div>';
  }
  
  startBtn?.addEventListener('click', () => {
    nonceDisplay.textContent = '0';
    attemptsCount.textContent = '0';
    hashRate.textContent = '0';
    timeElapsed.textContent = '0.0s';
    mine();
  });
  
  stopBtn?.addEventListener('click', stopMining);
  
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizFeedback = document.getElementById('quiz-feedback');
  
  quizOptions.forEach(option => {
    option.addEventListener('click', () => {
      quizOptions.forEach(o => o.classList.remove('selected', 'correct', 'incorrect'));
      
      const answer = option.dataset.answer;
      if (answer === 'b') {
        option.classList.add('correct');
        quizFeedback.className = 'quiz-feedback show correct';
        quizFeedback.innerHTML = '✅ 正确！篡改历史意味着攻击者必须重新计算被篡改区块及其后所有区块的工作量证明，而且速度要超过全网其他诚实节点，这在实践中几乎不可能。';
      } else {
        option.classList.add('incorrect');
        quizFeedback.className = 'quiz-feedback show incorrect';
        quizFeedback.innerHTML = '❌ 再想想。提示：想想如果有人想修改历史记录，他需要做什么？';
      }
    });
  });
  
  document.querySelectorAll('.page-nav .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      stopMining();
      navigateTo(btn.dataset.page);
    });
  });
}
