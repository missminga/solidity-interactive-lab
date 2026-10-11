export function renderUsecases() {
  return `
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">🎯 应用场景</h1>
        <p class="page-subtitle">不可变性与信任模型的实际应用</p>
      </div>
      
      <div class="card">
        <h3 class="card-title">🔒 不可变性的力量</h3>
        <p>
          区块链最核心的特性是<span class="highlight">不可变性</span>：
          一旦数据被写入，就几乎不可能被篡改或删除。
        </p>
        
        <div class="info-box" style="margin-top: 1rem;">
          <strong>为什么不可变？</strong>
          <ol style="margin: 0.5rem 0 0 1.2rem;">
            <li>哈希链接：改一个区块，后续所有区块的哈希都失效</li>
            <li>工作量证明：重新计算所有区块需要巨大算力</li>
            <li>去中心化：需要控制超过 50% 的网络算力</li>
          </ol>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">🤝 信任模型的转变</h3>
        <p>
          传统系统需要<span class="highlight">信任第三方</span>（银行、平台、政府）。
          区块链实现了<span class="highlight">无需信任</span>（Trustless）——
          你不需要信任任何人，只需信任数学和代码。
        </p>
        
        <table class="comparison-table" style="margin-top: 1rem;">
          <tr>
            <th>场景</th>
            <th>传统模式</th>
            <th>区块链模式</th>
          </tr>
          <tr>
            <td>转账</td>
            <td>信任银行正确处理</td>
            <td>协议规则自动执行</td>
          </tr>
          <tr>
            <td>合同</td>
            <td>信任法院强制执行</td>
            <td>智能合约自动执行</td>
          </tr>
          <tr>
            <td>记录</td>
            <td>信任机构不篡改</td>
            <td>链上数据不可变</td>
          </tr>
        </table>
      </div>
      
      <div class="card">
        <h3 class="card-title">🪙 代币（Tokens）</h3>
        <p>
          代币是区块链上最基础的应用之一。它可以代表任何有价值的东西。
        </p>
        
        <div class="concept-grid" style="margin-top: 1rem;">
          <div class="concept-card">
            <div class="concept-icon">💰</div>
            <h4 class="concept-title">加密货币</h4>
            <p class="concept-desc">如 ETH、USDT。可分割、可互换的数字资产</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🎫</div>
            <h4 class="concept-title">实用代币</h4>
            <p class="concept-desc">平台内部的"积分"或访问权限</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🏛️</div>
            <h4 class="concept-title">治理代币</h4>
            <p class="concept-desc">持有者可以投票参与项目决策</p>
          </div>
        </div>
        
        <div class="demo-container" style="margin-top: 1rem;">
          <div class="demo-title">ERC-20 标准代币</div>
          <p style="color: var(--text-secondary);">
            ERC-20 是以太坊上同质化代币的标准接口。任何遵循这个标准的代币都可以：
          </p>
          <ul style="margin: 0.5rem 0 0 1.5rem; color: var(--text-secondary);">
            <li>被钱包自动识别和显示</li>
            <li>在去中心化交易所交易</li>
            <li>被其他智能合约调用</li>
          </ul>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">💸 DeFi（去中心化金融）</h3>
        <p>
          DeFi 用智能合约重建传统金融服务，无需银行或券商。
        </p>
        
        <div class="concept-grid" style="margin-top: 1rem;">
          <div class="concept-card">
            <div class="concept-icon">🔄</div>
            <h4 class="concept-title">去中心化交易所</h4>
            <p class="concept-desc">无需中间商，用户直接交换代币。如 Uniswap</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🏦</div>
            <h4 class="concept-title">借贷协议</h4>
            <p class="concept-desc">存入资产赚利息，或抵押资产借款。如 Aave</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🪙</div>
            <h4 class="concept-title">稳定币</h4>
            <p class="concept-desc">与法币挂钩的代币。如 USDC、DAI</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">📈</div>
            <h4 class="concept-title">收益聚合</h4>
            <p class="concept-desc">自动优化资产收益策略。如 Yearn</p>
          </div>
        </div>
        
        <div class="info-box warning" style="margin-top: 1rem;">
          <strong>⚠️ 智能合约风险</strong><br>
          "代码即法律"是把双刃剑：代码 bug 会被自动执行，无法撤回。
          历史上多次重大损失都源于合约漏洞。
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">🖼️ NFT（非同质化代币）</h3>
        <p>
          NFT = <span class="highlight">Non-Fungible Token</span>，每个代币都是独一无二的。
        </p>
        
        <div class="demo-container" style="margin-top: 1rem;">
          <div class="demo-title">同质化 vs 非同质化</div>
          <div class="key-pair">
            <div class="key-box" style="border-color: var(--accent);">
              <h4 class="key-title">🪙 同质化（ERC-20）</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">
                1 ETH = 另一个 1 ETH<br>
                完全可互换，像纸币
              </p>
            </div>
            <div class="key-box" style="border-color: var(--primary);">
              <h4 class="key-title">🖼️ 非同质化（ERC-721）</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">
                每个代币唯一<br>
                像艺术品、收藏品
              </p>
            </div>
          </div>
        </div>
        
        <div class="concept-grid" style="margin-top: 1rem;">
          <div class="concept-card">
            <div class="concept-icon">🎨</div>
            <h4 class="concept-title">数字艺术</h4>
            <p class="concept-desc">证明数字作品的原创性和所有权</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🎮</div>
            <h4 class="concept-title">游戏资产</h4>
            <p class="concept-desc">游戏内物品可以在游戏外交易</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🏠</div>
            <h4 class="concept-title">真实资产</h4>
            <p class="concept-desc">房产、证书等资产的数字化表示</p>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">🌍 更多应用方向</h3>
        
        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">🗳️</div>
            <h4 class="concept-title">投票系统</h4>
            <p class="concept-desc">透明、可验证、防篡改的选举</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">📦</div>
            <h4 class="concept-title">供应链</h4>
            <p class="concept-desc">追踪商品从原产地到消费者的全过程</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🏥</div>
            <h4 class="concept-title">医疗记录</h4>
            <p class="concept-desc">患者可控的、不可篡改的健康档案</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">📜</div>
            <h4 class="concept-title">公证存证</h4>
            <p class="concept-desc">时间戳证明某文件在某时刻存在</p>
          </div>
        </div>
      </div>
      
      <div class="card" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(16, 185, 129, 0.1)); border-color: var(--primary);">
        <h3 class="card-title">🎉 恭喜完成学习！</h3>
        <p>
          你已经掌握了区块链的核心理论概念：
        </p>
        <ul style="margin: 1rem 0 1rem 1.5rem; color: var(--text-secondary);">
          <li>✅ 区块、哈希、链式结构</li>
          <li>✅ 工作量证明与权益证明</li>
          <li>✅ 去中心化网络与共识</li>
          <li>✅ 密钥、签名、钱包</li>
          <li>✅ UTXO 与账户模型</li>
          <li>✅ 智能合约、Gas、事件</li>
          <li>✅ 代币、DeFi、NFT 等应用</li>
        </ul>
        <p>
          接下来，你可以尝试在 <a href="https://remix.ethereum.org" target="_blank" style="color: var(--primary);">Remix IDE</a> 中部署我们的 Counter.sol 合约，
          亲自体验智能合约的完整生命周期！
        </p>
      </div>
      
      <div class="quiz-container">
        <h3 class="quiz-title">📝 最终测验</h3>
        <p class="quiz-question">为什么说区块链实现了"无需信任"（Trustless）？</p>
        <div class="quiz-options" id="quiz-options">
          <div class="quiz-option" data-answer="a">A. 因为所有参与者都是可信的</div>
          <div class="quiz-option" data-answer="b">B. 因为有政府监管</div>
          <div class="quiz-option" data-answer="c">C. 因为规则由代码和密码学强制执行，无需依赖任何第三方</div>
          <div class="quiz-option" data-answer="d">D. 因为区块链公司承诺不会作恶</div>
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
      </div>
      
      <div class="page-nav">
        <button class="btn btn-secondary" data-page="contracts">← 智能合约</button>
        <button class="btn btn-primary" data-page="home">返回首页 🏠</button>
      </div>
    </div>
  `;
}

export function initUsecases(navigateTo) {
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizFeedback = document.getElementById('quiz-feedback');
  
  quizOptions.forEach(option => {
    option.addEventListener('click', () => {
      quizOptions.forEach(o => o.classList.remove('selected', 'correct', 'incorrect'));
      
      const answer = option.dataset.answer;
      if (answer === 'c') {
        option.classList.add('correct');
        quizFeedback.className = 'quiz-feedback show correct';
        quizFeedback.innerHTML = '✅ 正确！"无需信任"不是说网络中没有坏人，而是说即使有坏人，他们也无法作弊——因为规则由数学和代码强制执行，而不是依赖任何人的诚信。';
      } else {
        option.classList.add('incorrect');
        quizFeedback.className = 'quiz-feedback show incorrect';
        quizFeedback.innerHTML = '❌ 再想想。提示："Trustless"的意思是你不需要信任任何人...';
      }
    });
  });
  
  document.querySelectorAll('.page-nav .btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });
}
