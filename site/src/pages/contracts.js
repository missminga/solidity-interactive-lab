import { sha256, generateTxHash } from '../utils/crypto.js';

let contractState = {
  count: 0,
  blocks: [],
  transactions: [],
  blockNumber: 1
};

export function renderContracts() {
  return `
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">📜 智能合约</h1>
        <p class="page-subtitle">理解链上代码与状态</p>
      </div>
      
      <div class="card">
        <h3 class="card-title">🤖 什么是智能合约？</h3>
        <p>
          智能合约是<span class="highlight">部署在区块链上、自动执行的程序</span>。
        </p>
        
        <div class="concept-grid" style="margin-top: 1rem;">
          <div class="concept-card">
            <div class="concept-icon">📜</div>
            <h4 class="concept-title">代码即法律</h4>
            <p class="concept-desc">合约规则写在代码中，自动执行，无法篡改</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🔄</div>
            <h4 class="concept-title">状态存储</h4>
            <p class="concept-desc">合约有自己的持久化存储空间</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">💎</div>
            <h4 class="concept-title">可持有资产</h4>
            <p class="concept-desc">合约可以接收、持有和发送加密货币</p>
          </div>
        </div>
        
        <div class="info-box" style="margin-top: 1rem;">
          <strong>类比</strong>：想象一台"自动售货机"——
          你投币（发送交易），机器按照预设规则执行（合约代码），
          给你商品（改变状态或转账）。整个过程自动、透明、不可篡改。
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">📝 Counter.sol 示例</h3>
        <p>
          让我们用一个最简单的计数器合约来理解核心概念：
        </p>
        
        <div class="demo-container">
          <div class="demo-title">合约代码（简化）</div>
          <pre style="background: var(--bg-card); padding: 1rem; border-radius: 8px; overflow-x: auto; font-size: 0.85rem; line-height: 1.6;">
<span style="color: #6366f1;">contract</span> <span style="color: #10b981;">Counter</span> {
    <span style="color: #94a3b8;">// 状态变量：存储在链上</span>
    <span style="color: #f59e0b;">uint256</span> <span style="color: #f1f5f9;">public</span> count;

    <span style="color: #94a3b8;">// 事件：记录发生了什么</span>
    <span style="color: #6366f1;">event</span> <span style="color: #10b981;">Increment</span>(address caller, uint256 newCount);
    <span style="color: #6366f1;">event</span> <span style="color: #10b981;">Decrement</span>(address caller, uint256 newCount);

    <span style="color: #94a3b8;">// 函数：修改状态</span>
    <span style="color: #6366f1;">function</span> <span style="color: #10b981;">increment</span>() <span style="color: #f1f5f9;">external</span> {
        count += 1;
        <span style="color: #6366f1;">emit</span> Increment(msg.sender, count);
    }

    <span style="color: #6366f1;">function</span> <span style="color: #10b981;">decrement</span>() <span style="color: #f1f5f9;">external</span> {
        count -= 1;
        <span style="color: #6366f1;">emit</span> Decrement(msg.sender, count);
    }
}</pre>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">📖 读调用 vs 写交易</h3>
        
        <div class="key-pair">
          <div class="key-box" style="border-color: var(--secondary);">
            <h4 class="key-title" style="color: var(--secondary);">📗 读调用 (Call)</h4>
            <ul style="font-size: 0.9rem; color: var(--text-secondary); margin-left: 1.2rem;">
              <li>只读取数据，不修改状态</li>
              <li><strong>不需要 Gas</strong></li>
              <li>瞬间返回结果</li>
              <li>例：<code>count()</code></li>
            </ul>
          </div>
          <div class="key-box" style="border-color: var(--accent);">
            <h4 class="key-title" style="color: var(--accent);">📙 写交易 (Transaction)</h4>
            <ul style="font-size: 0.9rem; color: var(--text-secondary); margin-left: 1.2rem;">
              <li>修改链上状态</li>
              <li><strong>需要支付 Gas</strong></li>
              <li>需要等待区块确认</li>
              <li>例：<code>increment()</code></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">⛽ 什么是 Gas？</h3>
        <p>
          <span class="highlight">Gas</span> 是以太坊上计算和存储的计量单位。
        </p>
        <ul style="margin: 1rem 0 0 1.5rem; color: var(--text-secondary);">
          <li><strong>Gas 用量</strong>：操作复杂度决定（存储 > 计算 > 读取）</li>
          <li><strong>Gas 价格</strong>：你愿意为每单位 Gas 支付多少 ETH</li>
          <li><strong>实际费用</strong> = Gas 用量 × Gas 价格</li>
        </ul>
        
        <div class="info-box warning" style="margin-top: 1rem;">
          <strong>为什么需要 Gas？</strong><br>
          防止滥用网络资源。没有费用的话，攻击者可以无限循环占用所有节点的计算资源。
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">🎮 Counter 合约模拟器</h3>
        <p style="margin-bottom: 1rem;">
          点击按钮与模拟的 Counter 合约交互，观察交易、区块和状态变化
        </p>
        
        <div class="demo-container">
          <div class="contract-state">
            <div class="state-item">
              <div class="state-value" id="count-value">0</div>
              <div class="state-label">count 状态值</div>
            </div>
            <div class="state-item">
              <div class="state-value" id="block-number">1</div>
              <div class="state-label">当前区块高度</div>
            </div>
          </div>
          
          <div class="btn-group" style="justify-content: center; margin: 1.5rem 0;">
            <button class="btn btn-success" id="btn-increment">➕ increment()</button>
            <button class="btn btn-danger" id="btn-decrement">➖ decrement()</button>
            <button class="btn btn-secondary" id="btn-read">👁️ 读取 count()</button>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <div class="demo-title">📦 区块列表</div>
              <div class="transaction-log" id="block-log" style="min-height: 200px;">
                <div style="color: var(--text-secondary); text-align: center; padding: 2rem;">
                  执行交易后这里会显示区块
                </div>
              </div>
            </div>
            <div>
              <div class="demo-title">📋 交易日志</div>
              <div class="transaction-log" id="tx-log" style="min-height: 200px;">
                <div style="color: var(--text-secondary); text-align: center; padding: 2rem;">
                  点击 increment 或 decrement 开始
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">📡 事件（Events）</h3>
        <p>
          合约可以触发<span class="highlight">事件</span>，让外部应用（如前端）监听链上发生了什么。
          事件数据存储在区块的日志中，比直接读取状态更高效。
        </p>
        
        <div class="demo-container">
          <div class="demo-title">Counter 合约的事件</div>
          <pre style="background: var(--bg-card); padding: 1rem; border-radius: 8px; font-size: 0.85rem;">
<span style="color: #6366f1;">event</span> <span style="color: #10b981;">Increment</span>(
    <span style="color: #f59e0b;">address indexed</span> caller,  <span style="color: #94a3b8;">// 谁调用的</span>
    <span style="color: #f59e0b;">uint256</span> newCount           <span style="color: #94a3b8;">// 新的 count 值</span>
);
</pre>
        </div>
      </div>
      
      <div class="quiz-container">
        <h3 class="quiz-title">📝 小测验</h3>
        <p class="quiz-question">调用 count() 读取当前值需要支付 Gas 吗？</p>
        <div class="quiz-options" id="quiz-options">
          <div class="quiz-option" data-answer="a">A. 需要，所有操作都要 Gas</div>
          <div class="quiz-option" data-answer="b">B. 不需要，读取操作是免费的</div>
          <div class="quiz-option" data-answer="c">C. 取决于网络拥堵程度</div>
          <div class="quiz-option" data-answer="d">D. 只在第一次读取时需要</div>
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
      </div>
      
      <div class="page-nav">
        <button class="btn btn-secondary" data-page="models">← UTXO vs 账户</button>
        <button class="btn btn-primary" data-page="usecases">下一章：应用场景 →</button>
      </div>
    </div>
  `;
}

function addTransaction(type, gasUsed) {
  const txHash = generateTxHash();
  const tx = {
    hash: txHash,
    type,
    gasUsed,
    timestamp: new Date().toLocaleTimeString()
  };
  contractState.transactions.unshift(tx);
  
  contractState.blocks.push({
    number: contractState.blockNumber,
    txHash,
    type,
    timestamp: tx.timestamp
  });
  contractState.blockNumber++;
  
  updateUI();
}

function updateUI() {
  const countValue = document.getElementById('count-value');
  const blockNumber = document.getElementById('block-number');
  const txLog = document.getElementById('tx-log');
  const blockLog = document.getElementById('block-log');
  
  if (countValue) countValue.textContent = contractState.count;
  if (blockNumber) blockNumber.textContent = contractState.blockNumber;
  
  if (txLog && contractState.transactions.length > 0) {
    txLog.innerHTML = contractState.transactions.slice(0, 10).map(tx => `
      <div class="tx-item">
        <span class="tx-type ${tx.type.toLowerCase()}">${tx.type === 'INCREMENT' ? '➕' : '➖'} ${tx.type}</span>
        <span class="tx-gas">⛽ ${tx.gasUsed} gas</span>
        <div class="tx-hash">${tx.hash.slice(0, 20)}...</div>
      </div>
    `).join('');
  }
  
  if (blockLog && contractState.blocks.length > 0) {
    blockLog.innerHTML = contractState.blocks.slice(-5).reverse().map(block => `
      <div class="tx-item" style="border-left: 3px solid var(--primary); padding-left: 1rem;">
        <div style="font-weight: 600;">📦 区块 #${block.number}</div>
        <div style="font-size: 0.8rem; color: var(--text-secondary);">
          ${block.type === 'INCREMENT' ? '➕' : '➖'} count → ${contractState.count}
        </div>
        <div class="tx-hash">${block.timestamp}</div>
      </div>
    `).join('');
  }
}

export function initContracts(navigateTo) {
  contractState = {
    count: 0,
    blocks: [],
    transactions: [],
    blockNumber: 1
  };
  
  const btnIncrement = document.getElementById('btn-increment');
  const btnDecrement = document.getElementById('btn-decrement');
  const btnRead = document.getElementById('btn-read');
  
  btnIncrement?.addEventListener('click', () => {
    btnIncrement.disabled = true;
    btnIncrement.textContent = '⏳ 确认中...';
    
    setTimeout(() => {
      contractState.count++;
      addTransaction('INCREMENT', 26384);
      
      btnIncrement.disabled = false;
      btnIncrement.textContent = '➕ increment()';
    }, 800);
  });
  
  btnDecrement?.addEventListener('click', () => {
    if (contractState.count <= 0) {
      const txLog = document.getElementById('tx-log');
      if (txLog) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'tx-item';
        errorDiv.innerHTML = '<span style="color: var(--danger);">❌ 交易失败：count is zero</span>';
        txLog.insertBefore(errorDiv, txLog.firstChild);
        setTimeout(() => errorDiv.remove(), 3000);
      }
      return;
    }
    
    btnDecrement.disabled = true;
    btnDecrement.textContent = '⏳ 确认中...';
    
    setTimeout(() => {
      contractState.count--;
      addTransaction('DECREMENT', 26406);
      
      btnDecrement.disabled = false;
      btnDecrement.textContent = '➖ decrement()';
    }, 800);
  });
  
  btnRead?.addEventListener('click', () => {
    const txLog = document.getElementById('tx-log');
    if (txLog) {
      const readDiv = document.createElement('div');
      readDiv.className = 'tx-item';
      readDiv.innerHTML = `
        <span style="color: var(--secondary);">👁️ READ count()</span>
        <span style="color: var(--secondary);">⛽ 0 gas (免费)</span>
        <div style="color: var(--primary); font-weight: bold;">返回值: ${contractState.count}</div>
      `;
      txLog.insertBefore(readDiv, txLog.firstChild);
    }
  });
  
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizFeedback = document.getElementById('quiz-feedback');
  
  quizOptions.forEach(option => {
    option.addEventListener('click', () => {
      quizOptions.forEach(o => o.classList.remove('selected', 'correct', 'incorrect'));
      
      const answer = option.dataset.answer;
      if (answer === 'b') {
        option.classList.add('correct');
        quizFeedback.className = 'quiz-feedback show correct';
        quizFeedback.innerHTML = '✅ 正确！读取操作（view/pure 函数）不修改链上状态，由你本地节点执行，不需要全网共识，所以免费。';
      } else {
        option.classList.add('incorrect');
        quizFeedback.className = 'quiz-feedback show incorrect';
        quizFeedback.innerHTML = '❌ 再想想。提示：只有需要全网共识确认的状态修改才需要付费...';
      }
    });
  });
  
  document.querySelectorAll('.page-nav .btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });
}
