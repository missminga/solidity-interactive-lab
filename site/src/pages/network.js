let nodes = [];
let connections = [];
let animationId = null;

export function renderNetwork() {
  return `
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">🌐 去中心化网络</h1>
        <p class="page-subtitle">理解节点、广播和共识</p>
      </div>
      
      <div class="card">
        <h3 class="card-title">🖥️ 什么是节点？</h3>
        <p>
          <span class="highlight">节点</span>是参与区块链网络的计算机。每个节点都：
        </p>
        <div class="concept-grid" style="margin-top: 1rem;">
          <div class="concept-card">
            <div class="concept-icon">💾</div>
            <h4 class="concept-title">存储账本副本</h4>
            <p class="concept-desc">每个节点都有完整的区块链数据</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">✅</div>
            <h4 class="concept-title">验证交易</h4>
            <p class="concept-desc">检查交易是否合法有效</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">📢</div>
            <h4 class="concept-title">广播消息</h4>
            <p class="concept-desc">将新交易和区块传递给其他节点</p>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">🎮 网络广播模拟</h3>
        <p style="margin-bottom: 1rem;">
          点击任意节点发起一笔"交易"，观察消息如何在网络中传播
        </p>
        
        <div class="demo-container">
          <div class="network-visual" id="network-visual">
            <svg id="network-svg" style="position: absolute; width: 100%; height: 100%; pointer-events: none;"></svg>
            <!-- Nodes will be rendered here -->
          </div>
          <div style="text-align: center; margin-top: 1rem; color: var(--text-secondary);">
            点击节点发起交易广播
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">🍴 分叉与最长链规则</h3>
        <p>
          在分布式网络中，有时两个矿工几乎同时找到有效区块，这就产生了<span class="highlight">分叉</span>。
        </p>
        
        <div class="demo-container">
          <div class="demo-title">分叉示意</div>
          <div style="font-family: monospace; line-height: 2; padding: 1rem; background: var(--bg-card); border-radius: 8px;">
            <div style="color: var(--text-secondary);">                    ┌──[区块 A]</div>
            <div>[区块 1]──[区块 2]──┤</div>
            <div style="color: var(--text-secondary);">                    └──[区块 B]──[区块 C] ← 更长，胜出</div>
          </div>
          <p style="margin-top: 1rem; color: var(--text-secondary);">
            规则很简单：<strong style="color: var(--primary);">最长的链胜出</strong>。
            较短的分支会被抛弃，其中的交易回到待确认池。
          </p>
        </div>
        
        <div class="info-box" style="margin-top: 1rem;">
          <strong>为什么等待多个确认？</strong><br>
          一笔交易被打包进区块后，后面每增加一个区块，这笔交易被回滚的可能性就呈指数级下降。
          通常 6 个确认（约 1 小时）被认为是"几乎不可能被逆转"的。
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">🏛️ 去中心化的意义</h3>
        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">🛡️</div>
            <h4 class="concept-title">抗审查</h4>
            <p class="concept-desc">没有单一实体可以阻止交易</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">💪</div>
            <h4 class="concept-title">抗故障</h4>
            <p class="concept-desc">部分节点下线不影响网络运行</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🔍</div>
            <h4 class="concept-title">透明可验证</h4>
            <p class="concept-desc">任何人都可以运行节点并验证</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🚫</div>
            <h4 class="concept-title">无需信任</h4>
            <p class="concept-desc">不依赖任何第三方权威</p>
          </div>
        </div>
      </div>
      
      <div class="quiz-container">
        <h3 class="quiz-title">📝 小测验</h3>
        <p class="quiz-question">如果网络中暂时出现两个长度相同的分叉，会发生什么？</p>
        <div class="quiz-options" id="quiz-options">
          <div class="quiz-option" data-answer="a">A. 网络崩溃</div>
          <div class="quiz-option" data-answer="b">B. 所有节点投票决定保留哪个</div>
          <div class="quiz-option" data-answer="c">C. 等待，直到某个分叉变得更长，然后全网切换到更长的链</div>
          <div class="quiz-option" data-answer="d">D. 两个分叉永远并存</div>
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
      </div>
      
      <div class="page-nav">
        <button class="btn btn-secondary" data-page="mining">← 挖矿与共识</button>
        <button class="btn btn-primary" data-page="keys">下一章：密钥与钱包 →</button>
      </div>
    </div>
  `;
}

function initNetworkVisualization() {
  const container = document.getElementById('network-visual');
  const svg = document.getElementById('network-svg');
  if (!container || !svg) return;
  
  const rect = container.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  
  nodes = [
    { id: 0, x: width * 0.5, y: height * 0.15, emoji: '🖥️' },
    { id: 1, x: width * 0.2, y: height * 0.35, emoji: '💻' },
    { id: 2, x: width * 0.8, y: height * 0.35, emoji: '🖥️' },
    { id: 3, x: width * 0.15, y: height * 0.65, emoji: '📱' },
    { id: 4, x: width * 0.5, y: height * 0.55, emoji: '💻' },
    { id: 5, x: width * 0.85, y: height * 0.65, emoji: '🖥️' },
    { id: 6, x: width * 0.35, y: height * 0.85, emoji: '📱' },
    { id: 7, x: width * 0.65, y: height * 0.85, emoji: '💻' },
  ];
  
  connections = [
    [0, 1], [0, 2], [0, 4],
    [1, 3], [1, 4],
    [2, 4], [2, 5],
    [3, 6], [4, 6], [4, 7],
    [5, 7], [6, 7]
  ];
  
  let svgContent = '';
  connections.forEach(([a, b]) => {
    svgContent += `
      <line 
        x1="${nodes[a].x}" y1="${nodes[a].y}"
        x2="${nodes[b].x}" y2="${nodes[b].y}"
        stroke="#334155" stroke-width="2"
        data-connection="${a}-${b}"
      />
    `;
  });
  svg.innerHTML = svgContent;
  
  nodes.forEach(node => {
    const div = document.createElement('div');
    div.className = 'node';
    div.dataset.nodeId = node.id;
    div.style.left = `${node.x - 30}px`;
    div.style.top = `${node.y - 30}px`;
    div.textContent = node.emoji;
    container.appendChild(div);
    
    div.addEventListener('click', () => broadcastFromNode(node.id));
  });
}

function broadcastFromNode(startId) {
  const visited = new Set();
  const queue = [{ id: startId, delay: 0 }];
  
  while (queue.length > 0) {
    const { id, delay } = queue.shift();
    if (visited.has(id)) continue;
    visited.add(id);
    
    setTimeout(() => {
      const nodeEl = document.querySelector(`.node[data-node-id="${id}"]`);
      if (nodeEl) {
        nodeEl.classList.add('broadcasting');
        setTimeout(() => nodeEl.classList.remove('broadcasting'), 500);
      }
      
      connections.forEach(([a, b]) => {
        if ((a === id && !visited.has(b)) || (b === id && !visited.has(a))) {
          const targetId = a === id ? b : a;
          const line = document.querySelector(`line[data-connection="${Math.min(a, b)}-${Math.max(a, b)}"]`);
          if (line) {
            line.style.stroke = '#10b981';
            line.style.strokeWidth = '3';
            setTimeout(() => {
              line.style.stroke = '#334155';
              line.style.strokeWidth = '2';
            }, 400);
          }
        }
      });
    }, delay);
    
    connections.forEach(([a, b]) => {
      if (a === id && !visited.has(b)) {
        queue.push({ id: b, delay: delay + 300 });
      } else if (b === id && !visited.has(a)) {
        queue.push({ id: a, delay: delay + 300 });
      }
    });
  }
}

export function initNetwork(navigateTo) {
  initNetworkVisualization();
  
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizFeedback = document.getElementById('quiz-feedback');
  
  quizOptions.forEach(option => {
    option.addEventListener('click', () => {
      quizOptions.forEach(o => o.classList.remove('selected', 'correct', 'incorrect'));
      
      const answer = option.dataset.answer;
      if (answer === 'c') {
        option.classList.add('correct');
        quizFeedback.className = 'quiz-feedback show correct';
        quizFeedback.innerHTML = '✅ 正确！节点会临时保留两个版本，一旦某个分叉变长，全网会自动切换到最长链。这个过程是自动的，无需投票。';
      } else {
        option.classList.add('incorrect');
        quizFeedback.className = 'quiz-feedback show incorrect';
        quizFeedback.innerHTML = '❌ 再想想。提示：最长链规则如何解决这个问题？';
      }
    });
  });
  
  document.querySelectorAll('.page-nav .btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });
}
