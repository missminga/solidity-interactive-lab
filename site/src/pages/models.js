export function renderModels() {
  return `
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">💰 UTXO vs 账户模型</h1>
        <p class="page-subtitle">比特币和以太坊如何记录余额</p>
      </div>
      
      <div class="card">
        <h3 class="card-title">🤔 区块链如何知道你有多少钱？</h3>
        <p>
          这看似简单的问题，比特币和以太坊给出了两种完全不同的答案。
          理解它们的差异有助于理解两条链的设计哲学。
        </p>
      </div>
      
      <div class="card">
        <h3 class="card-title">🔷 比特币：UTXO 模型</h3>
        <p>
          UTXO = <span class="highlight">Unspent Transaction Output</span>（未花费的交易输出）
        </p>
        
        <div class="demo-container">
          <div class="demo-title">💵 现金类比</div>
          <p style="margin-bottom: 1rem; color: var(--text-secondary);">
            想象你的钱包里有几张钞票：一张 50 元、一张 20 元、一张 5 元
          </p>
          
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin: 1.5rem 0;">
            <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 1rem 2rem; border-radius: 8px; text-align: center;">
              <div style="font-size: 1.5rem; font-weight: bold;">¥50</div>
              <div style="font-size: 0.75rem;">UTXO #1</div>
            </div>
            <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 1rem 2rem; border-radius: 8px; text-align: center;">
              <div style="font-size: 1.5rem; font-weight: bold;">¥20</div>
              <div style="font-size: 0.75rem;">UTXO #2</div>
            </div>
            <div style="background: linear-gradient(135deg, #6366f1, #4f46e5); padding: 1rem 2rem; border-radius: 8px; text-align: center;">
              <div style="font-size: 1.5rem; font-weight: bold;">¥5</div>
              <div style="font-size: 0.75rem;">UTXO #3</div>
            </div>
          </div>
          
          <p style="text-align: center; color: var(--text-secondary);">
            你的"余额" = 所有 UTXO 之和 = ¥75
          </p>
        </div>
        
        <div class="demo-container" style="margin-top: 1rem;">
          <div class="demo-title">🔄 交易示例：支付 ¥30</div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap;">
            <div style="text-align: center;">
              <div style="color: var(--danger);">消耗</div>
              <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 0.75rem 1.5rem; border-radius: 8px; margin-top: 0.5rem; opacity: 0.5; text-decoration: line-through;">
                ¥50
              </div>
            </div>
            <div style="font-size: 2rem;">→</div>
            <div style="text-align: center;">
              <div style="color: var(--secondary);">产生</div>
              <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                <div style="background: linear-gradient(135deg, #ef4444, #dc2626); padding: 0.75rem 1.5rem; border-radius: 8px;">
                  ¥30<br><span style="font-size: 0.7rem;">给对方</span>
                </div>
                <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 0.75rem 1.5rem; border-radius: 8px;">
                  ¥20<br><span style="font-size: 0.7rem;">找零给自己</span>
                </div>
              </div>
            </div>
          </div>
          <p style="margin-top: 1rem; color: var(--text-secondary); text-align: center;">
            旧 UTXO 被"销毁"，产生新的 UTXO
          </p>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">🔶 以太坊：账户模型</h3>
        <p>
          以太坊使用更直观的<span class="highlight">账户余额</span>模型，就像银行账户。
        </p>
        
        <div class="demo-container">
          <div class="demo-title">🏦 银行账户类比</div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
            <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px; border: 2px solid var(--primary);">
              <div style="font-size: 0.85rem; color: var(--text-secondary);">Alice 的账户</div>
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary);">75 ETH</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">
                nonce: 5（已发起 5 笔交易）
              </div>
            </div>
            <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px; border: 2px solid var(--secondary);">
              <div style="font-size: 0.85rem; color: var(--text-secondary);">Bob 的账户</div>
              <div style="font-size: 2rem; font-weight: bold; color: var(--secondary);">30 ETH</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">
                nonce: 12
              </div>
            </div>
          </div>
          
          <p style="color: var(--text-secondary);">
            交易直接修改账户余额数字，无需"找零"概念
          </p>
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title">📊 对比总结</h3>
        
        <table class="comparison-table">
          <tr>
            <th>方面</th>
            <th>UTXO（比特币）</th>
            <th>账户（以太坊）</th>
          </tr>
          <tr>
            <td>余额表示</td>
            <td>所有 UTXO 之和</td>
            <td>账户中的数字</td>
          </tr>
          <tr>
            <td>类比</td>
            <td>💵 现金钞票</td>
            <td>🏦 银行账户</td>
          </tr>
          <tr>
            <td>交易方式</td>
            <td>消耗旧 UTXO，创建新 UTXO</td>
            <td>直接修改余额</td>
          </tr>
          <tr>
            <td>隐私性</td>
            <td>较好（每笔交易可用新地址）</td>
            <td>较差（账户活动可追踪）</td>
          </tr>
          <tr>
            <td>并行处理</td>
            <td>天然支持（不同 UTXO 独立）</td>
            <td>需要串行处理 nonce</td>
          </tr>
          <tr>
            <td>智能合约</td>
            <td>有限支持</td>
            <td>原生支持，合约也是账户</td>
          </tr>
        </table>
      </div>
      
      <div class="card">
        <h3 class="card-title">💡 为什么以太坊选择账户模型？</h3>
        <p>
          以太坊的核心是<span class="highlight">智能合约</span>。
          账户模型让合约可以像普通账户一样持有余额和状态，
          使得复杂的合约交互变得更加自然。
        </p>
        
        <div class="info-box" style="margin-top: 1rem;">
          <strong>两种账户类型</strong>
          <ul style="margin-top: 0.5rem; margin-left: 1.2rem;">
            <li><strong>EOA</strong>（外部拥有账户）：普通用户账户，由私钥控制</li>
            <li><strong>合约账户</strong>：由代码控制，有自己的存储和余额</li>
          </ul>
        </div>
      </div>
      
      <div class="quiz-container">
        <h3 class="quiz-title">📝 小测验</h3>
        <p class="quiz-question">在比特币的 UTXO 模型中，如果你要支付 0.3 BTC，而你只有一个 1 BTC 的 UTXO，会发生什么？</p>
        <div class="quiz-options" id="quiz-options">
          <div class="quiz-option" data-answer="a">A. 交易失败，需要正好 0.3 BTC 的 UTXO</div>
          <div class="quiz-option" data-answer="b">B. 1 BTC 的 UTXO 被消耗，产生 0.3 BTC（给对方）和 0.7 BTC（找零给自己）两个新 UTXO</div>
          <div class="quiz-option" data-answer="c">C. 系统自动从你的 1 BTC UTXO 中扣除 0.3 BTC</div>
          <div class="quiz-option" data-answer="d">D. 整个 1 BTC 都发送给对方</div>
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
      </div>
      
      <div class="page-nav">
        <button class="btn btn-secondary" data-page="keys">← 密钥与钱包</button>
        <button class="btn btn-primary" data-page="contracts">下一章：智能合约 →</button>
      </div>
    </div>
  `;
}

export function initModels(navigateTo) {
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizFeedback = document.getElementById('quiz-feedback');
  
  quizOptions.forEach(option => {
    option.addEventListener('click', () => {
      quizOptions.forEach(o => o.classList.remove('selected', 'correct', 'incorrect'));
      
      const answer = option.dataset.answer;
      if (answer === 'b') {
        option.classList.add('correct');
        quizFeedback.className = 'quiz-feedback show correct';
        quizFeedback.innerHTML = '✅ 正确！UTXO 模型就像使用现金：你用一张大钞付款，收到找零。原来的 UTXO 被"花掉"，产生新的 UTXO。';
      } else {
        option.classList.add('incorrect');
        quizFeedback.className = 'quiz-feedback show incorrect';
        quizFeedback.innerHTML = '❌ 再想想。提示：UTXO 就像纸钞，不能"部分使用"，必须整张花掉然后找零...';
      }
    });
  });
  
  document.querySelectorAll('.page-nav .btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });
}
