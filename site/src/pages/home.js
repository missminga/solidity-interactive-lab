export function renderHome(navigateTo) {
  return `
    <div class="page">
      <div class="hero">
        <h1 class="hero-title">🔗 区块链理论学习</h1>
        <p class="hero-desc">
          通过交互式演示，直观理解区块链的核心概念。<br>
          无需代码基础，专注于原理和直觉。
        </p>
        <button class="btn btn-primary" id="start-btn">开始学习 →</button>
      </div>
      
      <div class="feature-grid">
        <div class="feature-card" data-page="blockchain">
          <div class="feature-icon">📦</div>
          <h3 class="feature-title">区块与链</h3>
          <p class="feature-desc">什么是区块？哈希如何串联成链？亲手破坏一个区块看看会发生什么。</p>
        </div>
        
        <div class="feature-card" data-page="mining">
          <div class="feature-icon">⛏️</div>
          <h3 class="feature-title">挖矿与共识</h3>
          <p class="feature-desc">工作量证明（PoW）如何工作？体验寻找 nonce 的过程。</p>
        </div>
        
        <div class="feature-card" data-page="network">
          <div class="feature-icon">🌐</div>
          <h3 class="feature-title">去中心化网络</h3>
          <p class="feature-desc">节点如何通信？交易如何广播？什么是分叉和最长链？</p>
        </div>
        
        <div class="feature-card" data-page="keys">
          <div class="feature-icon">🔐</div>
          <h3 class="feature-title">密钥与钱包</h3>
          <p class="feature-desc">私钥、公钥、地址之间的关系是什么？</p>
        </div>
        
        <div class="feature-card" data-page="models">
          <div class="feature-icon">💰</div>
          <h3 class="feature-title">UTXO vs 账户模型</h3>
          <p class="feature-desc">比特币和以太坊记账方式有何不同？</p>
        </div>
        
        <div class="feature-card" data-page="contracts">
          <div class="feature-icon">📜</div>
          <h3 class="feature-title">智能合约</h3>
          <p class="feature-desc">以 Counter 合约为例，理解合约、状态、Gas 和事件。</p>
        </div>
        
        <div class="feature-card" data-page="usecases">
          <div class="feature-icon">🎯</div>
          <h3 class="feature-title">应用场景</h3>
          <p class="feature-desc">代币、DeFi、NFT——区块链的信任模型如何支撑这些应用？</p>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">📖 关于本教程</h3>
        <p>
          本教程专为<span class="highlight">有编程经验但想从理论层面理解区块链</span>的学习者设计。
          我们不会深入代码细节，而是通过可视化和交互来建立直觉。
        </p>
        <ul style="margin-top: 1rem; margin-left: 1.5rem; color: var(--text-secondary);">
          <li>每个章节都有交互式演示</li>
          <li>章节末尾有小测验帮助巩固</li>
          <li>所有模拟都在浏览器本地运行</li>
        </ul>
      </div>
    </div>
  `;
}

export function initHome(navigateTo) {
  document.getElementById('start-btn')?.addEventListener('click', () => {
    navigateTo('blockchain');
  });
  
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
      navigateTo(card.dataset.page);
    });
  });
}
