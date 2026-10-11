import { generateKeyPair, generateAddress, sha256 } from '../utils/crypto.js';

let currentKeyPair = null;

export function renderKeys() {
  return `
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">🔐 密钥与钱包</h1>
        <p class="page-subtitle">理解加密身份和数字签名</p>
      </div>
      
      <div class="card">
        <h3 class="card-title">🗝️ 公钥密码学基础</h3>
        <p>
          区块链使用<span class="highlight">非对称加密</span>来证明身份。每个用户有一对密钥：
        </p>
        
        <div class="key-pair" style="margin-top: 1rem;">
          <div class="key-box private">
            <h4 class="key-title">🔴 私钥</h4>
            <ul style="font-size: 0.9rem; color: var(--text-secondary); margin-left: 1.2rem;">
              <li>必须<strong>严格保密</strong></li>
              <li>用于签署交易（证明"这是我发起的"）</li>
              <li>丢失 = 永久失去资产访问权</li>
              <li>泄露 = 资产被盗</li>
            </ul>
          </div>
          <div class="key-box public">
            <h4 class="key-title">🟢 公钥</h4>
            <ul style="font-size: 0.9rem; color: var(--text-secondary); margin-left: 1.2rem;">
              <li>可以<strong>公开分享</strong></li>
              <li>用于验证签名（确认交易来自私钥持有者）</li>
              <li>从私钥数学推导而来</li>
              <li>别人可用它向你发送资产</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">📍 地址是什么？</h3>
        <p>
          <span class="highlight">地址</span>是公钥的"压缩版"——更短、更方便分享。
          就像你的银行账号，别人用地址给你转账。
        </p>
        
        <div style="margin-top: 1rem; font-family: monospace; font-size: 0.9rem;">
          <div style="color: var(--text-secondary);">私钥 → 公钥 → 地址</div>
          <div style="margin-top: 0.5rem; padding: 0.5rem; background: var(--bg-dark); border-radius: 4px;">
            私钥: abc123... (64 字符)<br>
            ↓ 椭圆曲线运算<br>
            公钥: 04def456... (128 字符)<br>
            ↓ 哈希 + 截取<br>
            地址: 0x789... (42 字符)
          </div>
        </div>
        
        <div class="info-box warning" style="margin-top: 1rem;">
          <strong>单向推导</strong>：私钥 → 公钥 → 地址 的过程是单向的。
          无法从地址反推公钥，更无法从公钥反推私钥。
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">🎮 密钥生成演示</h3>
        <p style="margin-bottom: 1rem;">
          点击按钮生成一对新的密钥（仅供演示，请勿用于真实场景）
        </p>
        
        <div class="demo-container">
          <div class="btn-group" style="justify-content: center; margin-bottom: 1.5rem;">
            <button class="btn btn-primary" id="generate-keys">🎲 生成新密钥对</button>
          </div>
          
          <div class="key-pair">
            <div class="key-box private">
              <h4 class="key-title">🔴 私钥</h4>
              <div class="key-value" id="private-key">点击上方按钮生成...</div>
            </div>
            <div class="key-box public">
              <h4 class="key-title">🟢 公钥</h4>
              <div class="key-value" id="public-key">点击上方按钮生成...</div>
            </div>
          </div>
          
          <div style="margin-top: 1rem; text-align: center;">
            <span class="block-label">📍 派生地址</span>
            <div class="key-value" id="address" style="display: inline-block; margin-top: 0.5rem; color: var(--primary);">
              点击上方按钮生成...
            </div>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">✍️ 数字签名的作用</h3>
        <p>
          当你发起一笔交易时，你用私钥对交易内容进行<span class="highlight">签名</span>。
          任何人都可以用你的公钥验证这个签名的有效性。
        </p>
        
        <div class="demo-container">
          <div class="demo-title">签名流程</div>
          <div style="display: flex; justify-content: space-around; text-align: center; flex-wrap: wrap; gap: 1rem;">
            <div style="flex: 1; min-width: 150px;">
              <div style="font-size: 2rem;">📝</div>
              <div style="margin-top: 0.5rem;">交易内容</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">"转 1 ETH 给 Bob"</div>
            </div>
            <div style="padding-top: 1rem;">➕</div>
            <div style="flex: 1; min-width: 150px;">
              <div style="font-size: 2rem;">🔴</div>
              <div style="margin-top: 0.5rem;">私钥签名</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">只有你能做</div>
            </div>
            <div style="padding-top: 1rem;">➡️</div>
            <div style="flex: 1; min-width: 150px;">
              <div style="font-size: 2rem;">✅</div>
              <div style="margin-top: 0.5rem;">签名交易</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">任何人可验证</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">👛 钱包 ≠ 存钱</h3>
        <p>
          区块链"钱包"实际上<strong>不存储任何资产</strong>！
          资产记录在区块链上。钱包只是：
        </p>
        <ul style="margin: 1rem 0 0 1.5rem; color: var(--text-secondary);">
          <li>安全存储你的私钥</li>
          <li>方便签署和发送交易</li>
          <li>显示区块链上你的余额</li>
        </ul>
        
        <div class="info-box success" style="margin-top: 1rem;">
          <strong>类比</strong>：钱包更像是你的"钥匙串"——
          它不装钱，但持有它的人能打开银行金库中属于你的保险箱。
        </div>
      </div>
      
      <div class="quiz-container">
        <h3 class="quiz-title">📝 小测验</h3>
        <p class="quiz-question">如果你丢失了私钥，但还记得公钥和地址，你能：</p>
        <div class="quiz-options" id="quiz-options">
          <div class="quiz-option" data-answer="a">A. 用公钥恢复私钥</div>
          <div class="quiz-option" data-answer="b">B. 联系以太坊客服重置</div>
          <div class="quiz-option" data-answer="c">C. 什么也做不了，资产永久丢失</div>
          <div class="quiz-option" data-answer="d">D. 用地址恢复所有密钥</div>
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
      </div>
      
      <div class="page-nav">
        <button class="btn btn-secondary" data-page="network">← 去中心化网络</button>
        <button class="btn btn-primary" data-page="models">下一章：UTXO vs 账户 →</button>
      </div>
    </div>
  `;
}

export function initKeys(navigateTo) {
  const generateBtn = document.getElementById('generate-keys');
  const privateKeyEl = document.getElementById('private-key');
  const publicKeyEl = document.getElementById('public-key');
  const addressEl = document.getElementById('address');
  
  generateBtn?.addEventListener('click', () => {
    generateBtn.disabled = true;
    generateBtn.textContent = '⏳ 生成中...';
    
    setTimeout(() => {
      currentKeyPair = generateKeyPair();
      const address = generateAddress(currentKeyPair.publicKey);
      
      privateKeyEl.textContent = currentKeyPair.privateKey;
      publicKeyEl.textContent = currentKeyPair.publicKey;
      addressEl.textContent = address;
      
      generateBtn.disabled = false;
      generateBtn.textContent = '🎲 生成新密钥对';
    }, 500);
  });
  
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizFeedback = document.getElementById('quiz-feedback');
  
  quizOptions.forEach(option => {
    option.addEventListener('click', () => {
      quizOptions.forEach(o => o.classList.remove('selected', 'correct', 'incorrect'));
      
      const answer = option.dataset.answer;
      if (answer === 'c') {
        option.classList.add('correct');
        quizFeedback.className = 'quiz-feedback show correct';
        quizFeedback.innerHTML = '✅ 正确！私钥无法从公钥或地址恢复，也没有"客服"可以帮助你。这就是为什么备份私钥（或助记词）至关重要。';
      } else {
        option.classList.add('incorrect');
        quizFeedback.className = 'quiz-feedback show incorrect';
        quizFeedback.innerHTML = '❌ 再想想。提示：私钥 → 公钥 → 地址 是单向过程，区块链没有中心化管理机构...';
      }
    });
  });
  
  document.querySelectorAll('.page-nav .btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });
}
