import { sha256 } from '../utils/crypto.js';
import { escapeHtml } from '../utils/escape.js';

let blocks = [];
let blockElements = [];
let updateSequence = 0;

export function renderBlockchain() {
  return `
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">📦 区块与链</h1>
        <p class="page-subtitle">理解区块链最基础的构建块</p>
      </div>
      
      <div class="card">
        <h3 class="card-title">💡 什么是账本？</h3>
        <p>
          想象一个<span class="highlight">公共记账本</span>，所有人都可以查看，每一笔交易都被记录在上面。
          传统的账本（比如银行）由一个中心机构管理，而区块链则让所有参与者共同维护这个账本。
        </p>
      </div>
      
      <div class="card">
        <h3 class="card-title">🧱 什么是区块？</h3>
        <p>
          一个<span class="highlight">区块</span>就像账本中的一页，包含：
        </p>
        <div class="concept-grid" style="margin-top: 1rem;">
          <div class="concept-card">
            <div class="concept-icon">📝</div>
            <h4 class="concept-title">数据</h4>
            <p class="concept-desc">交易记录或其他信息</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">#️⃣</div>
            <h4 class="concept-title">哈希</h4>
            <p class="concept-desc">区块内容的"指纹"，唯一标识</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🔗</div>
            <h4 class="concept-title">前块哈希</h4>
            <p class="concept-desc">指向上一个区块的哈希</p>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">🔐 什么是哈希？</h3>
        <p>
          哈希函数将任意数据转换为固定长度的字符串。它有几个关键特性：
        </p>
        <ul style="margin: 1rem 0 1rem 1.5rem; color: var(--text-secondary);">
          <li><strong>确定性</strong>：相同输入总是产生相同输出</li>
          <li><strong>敏感性</strong>：输入微小变化会导致输出完全不同</li>
          <li><strong>单向性</strong>：无法从哈希值反推原始数据</li>
        </ul>
        
        <div class="demo-container">
          <div class="demo-title">🎮 试试哈希</div>
          <input type="text" class="block-input" id="hash-input" placeholder="输入任意文字..." style="margin-bottom: 1rem;">
          <div class="block-field">
            <span class="block-label">SHA-256 哈希值：</span>
            <span class="block-value hash" id="hash-output">（输入文字后显示）</span>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">⛓️ 区块如何形成链？</h3>
        <p>
          每个区块都包含前一个区块的哈希值。这就像一条锁链：
          如果有人试图修改历史记录，所有后续区块的哈希都会失效！
        </p>
        
        <div class="demo-container">
          <div class="demo-title">🎮 交互演示：尝试篡改区块</div>
          <p style="color: var(--text-secondary); margin-bottom: 1rem;">
            修改任意区块的数据，观察后续区块的哈希如何变化
          </p>
          <div class="blockchain-visual" id="blockchain-visual">
          </div>
          <div class="btn-group">
            <button class="btn btn-secondary" id="reset-chain">重置链</button>
            <button class="btn btn-primary" id="add-block">添加区块</button>
          </div>
        </div>
      </div>
      
      <div class="info-box success">
        <strong>🎯 关键洞察</strong><br>
        区块链的安全性来自于这种链式结构：篡改任何历史数据都会导致后续所有区块失效，
        这使得篡改在实践中几乎不可能（后面我们会看到为什么）。
      </div>
      
      <div class="quiz-container">
        <h3 class="quiz-title">📝 小测验</h3>
        <p class="quiz-question">如果攻击者想要修改 3 个区块之前的一笔交易，他需要：</p>
        <div class="quiz-options" id="quiz-options">
          <div class="quiz-option" data-answer="a">A. 只修改那一个区块</div>
          <div class="quiz-option" data-answer="b">B. 修改那个区块和它之后的所有区块</div>
          <div class="quiz-option" data-answer="c">C. 删除整条链</div>
          <div class="quiz-option" data-answer="d">D. 联系管理员</div>
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
      </div>
      
      <div class="page-nav">
        <button class="btn btn-secondary" data-page="home">← 首页</button>
        <button class="btn btn-primary" data-page="mining">下一章：挖矿 →</button>
      </div>
    </div>
  `;
}

async function createBlock(index, data, prevHash) {
  const content = `${index}${data}${prevHash}`;
  const hash = await sha256(content);
  return { index, data, prevHash, hash };
}

function createBlockElement(block, index) {
  const blockDiv = document.createElement('div');
  blockDiv.className = 'block valid';
  blockDiv.dataset.index = index;
  
  const header = document.createElement('div');
  header.className = 'block-header';
  header.textContent = `区块 #${block.index}`;
  
  const dataField = document.createElement('div');
  dataField.className = 'block-field';
  const dataLabel = document.createElement('span');
  dataLabel.className = 'block-label';
  dataLabel.textContent = '数据：';
  const dataInput = document.createElement('input');
  dataInput.type = 'text';
  dataInput.className = 'block-input block-data';
  dataInput.dataset.index = index;
  dataInput.value = block.data;
  dataField.appendChild(dataLabel);
  dataField.appendChild(dataInput);
  
  const prevHashField = document.createElement('div');
  prevHashField.className = 'block-field';
  const prevHashLabel = document.createElement('span');
  prevHashLabel.className = 'block-label';
  prevHashLabel.textContent = '前块哈希：';
  const prevHashValue = document.createElement('span');
  prevHashValue.className = 'block-value prev-hash-value';
  prevHashValue.textContent = block.prevHash.slice(0, 16) + '...';
  prevHashField.appendChild(prevHashLabel);
  prevHashField.appendChild(prevHashValue);
  
  const hashField = document.createElement('div');
  hashField.className = 'block-field';
  const hashLabel = document.createElement('span');
  hashLabel.className = 'block-label';
  hashLabel.textContent = '本块哈希：';
  const hashValue = document.createElement('span');
  hashValue.className = 'block-value hash hash-value';
  hashValue.textContent = block.hash.slice(0, 16) + '...';
  hashField.appendChild(hashLabel);
  hashField.appendChild(hashValue);
  
  blockDiv.appendChild(header);
  blockDiv.appendChild(dataField);
  blockDiv.appendChild(prevHashField);
  blockDiv.appendChild(hashField);
  
  return {
    element: blockDiv,
    input: dataInput,
    prevHashValue,
    hashValue
  };
}

function createArrowElement() {
  const arrow = document.createElement('div');
  arrow.className = 'chain-arrow';
  arrow.textContent = '→';
  return arrow;
}

function renderBlocksInitial() {
  const container = document.getElementById('blockchain-visual');
  if (!container) return;
  
  container.innerHTML = '';
  blockElements = [];
  
  for (let i = 0; i < blocks.length; i++) {
    if (i > 0) {
      container.appendChild(createArrowElement());
    }
    
    const blockEl = createBlockElement(blocks[i], i);
    container.appendChild(blockEl.element);
    blockElements.push(blockEl);
    
    blockEl.input.addEventListener('input', handleBlockInput);
  }
  
  updateBlockValidity();
}

async function handleBlockInput(e) {
  const index = parseInt(e.target.dataset.index);
  const newData = e.target.value;
  
  blocks[index].data = newData;
  
  const currentSequence = ++updateSequence;
  
  for (let i = index; i < blocks.length; i++) {
    const prevHash = i === 0 ? '0'.repeat(64) : blocks[i - 1].hash;
    blocks[i].prevHash = prevHash;
    const content = `${blocks[i].index}${blocks[i].data}${prevHash}`;
    const hash = await sha256(content);
    
    if (currentSequence !== updateSequence) {
      return;
    }
    
    blocks[i].hash = hash;
    
    if (blockElements[i]) {
      blockElements[i].prevHashValue.textContent = prevHash.slice(0, 16) + '...';
      blockElements[i].hashValue.textContent = hash.slice(0, 16) + '...';
    }
  }
  
  updateBlockValidity();
}

function updateBlockValidity() {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const blockEl = blockElements[i];
    if (!blockEl) continue;
    
    let isValid;
    if (i === 0) {
      isValid = block.prevHash === '0'.repeat(64);
    } else {
      isValid = block.prevHash === blocks[i - 1].hash;
    }
    
    blockEl.element.classList.toggle('valid', isValid);
    blockEl.element.classList.toggle('invalid', !isValid);
    blockEl.hashValue.classList.toggle('invalid', !isValid);
    
    const arrow = blockEl.element.previousElementSibling;
    if (arrow && arrow.classList.contains('chain-arrow')) {
      arrow.classList.toggle('broken', !isValid);
    }
  }
}

async function initChain() {
  blocks = [];
  updateSequence++;
  
  const genesisBlock = await createBlock(0, '创世区块', '0'.repeat(64));
  blocks.push(genesisBlock);
  
  const block1 = await createBlock(1, 'Alice 转账 10 给 Bob', genesisBlock.hash);
  blocks.push(block1);
  
  const block2 = await createBlock(2, 'Bob 转账 5 给 Charlie', block1.hash);
  blocks.push(block2);
  
  renderBlocksInitial();
}

async function addNewBlock() {
  const lastBlock = blocks[blocks.length - 1];
  const newBlock = await createBlock(
    blocks.length,
    `交易数据 ${blocks.length}`,
    lastBlock.hash
  );
  blocks.push(newBlock);
  
  const container = document.getElementById('blockchain-visual');
  if (!container) return;
  
  container.appendChild(createArrowElement());
  
  const blockEl = createBlockElement(newBlock, blocks.length - 1);
  container.appendChild(blockEl.element);
  blockElements.push(blockEl);
  
  blockEl.input.addEventListener('input', handleBlockInput);
  
  updateBlockValidity();
}

export function initBlockchain(navigateTo) {
  initChain();
  
  const hashInput = document.getElementById('hash-input');
  const hashOutput = document.getElementById('hash-output');
  
  hashInput?.addEventListener('input', async (e) => {
    if (e.target.value) {
      const hash = await sha256(e.target.value);
      hashOutput.textContent = hash;
    } else {
      hashOutput.textContent = '（输入文字后显示）';
    }
  });
  
  document.getElementById('reset-chain')?.addEventListener('click', initChain);
  document.getElementById('add-block')?.addEventListener('click', addNewBlock);
  
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizFeedback = document.getElementById('quiz-feedback');
  
  quizOptions.forEach(option => {
    option.addEventListener('click', () => {
      quizOptions.forEach(o => o.classList.remove('selected', 'correct', 'incorrect'));
      
      const answer = option.dataset.answer;
      if (answer === 'b') {
        option.classList.add('correct');
        quizFeedback.className = 'quiz-feedback show correct';
        quizFeedback.innerHTML = '✅ 正确！修改一个区块会改变它的哈希，导致后续所有区块的"前块哈希"字段失效，必须全部重新计算。';
      } else {
        option.classList.add('incorrect');
        quizFeedback.className = 'quiz-feedback show incorrect';
        quizFeedback.innerHTML = '❌ 再想想。提示：改变一个区块的内容会改变它的哈希值...';
      }
    });
  });
  
  document.querySelectorAll('.page-nav .btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });
}
