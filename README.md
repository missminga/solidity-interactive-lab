# Solidity 交互式学习实验室

一个面向初学者的智能合约交互项目，包含区块链理论学习网站和智能合约示例。

## 🌐 在线访问

访问学习网站：**https://missminga.github.io/solidity-interactive-lab/**

## 📚 项目内容

### 区块链理论学习网站 (`site/`)

一个交互式的区块链理论学习网站，通过可视化和模拟帮助理解核心概念：

1. **📦 区块与链** - 哈希、区块结构、链式连接（可交互修改区块观察链断裂）
2. **⛏️ 挖矿与共识** - 工作量证明模拟（可调节难度的 nonce 搜索动画）、PoS 对比
3. **🌐 去中心化网络** - 节点通信、交易广播可视化、分叉与最长链
4. **🔐 密钥与钱包** - 公私钥生成演示、数字签名概念
5. **💰 UTXO vs 账户** - 比特币和以太坊记账模型对比
6. **📜 智能合约** - 以 Counter.sol 为例的合约模拟器（交易、Gas、事件）
7. **🎯 应用场景** - 代币、DeFi、NFT 等概念介绍

### 智能合约 (`contracts/`)

- `Counter.sol`：最小可交互计数合约

### Remix 指南 (`remix/`)

- `quickstart.md`：基于 Remix 的快速部署步骤

## 🧪 运行 E2E 测试

本项目使用 Playwright 进行端到端测试，验证真实用户在浏览器中的交互行为。

### 安装依赖

```bash
cd site
npm install
npx playwright install chromium
```

### 运行测试

```bash
# 构建站点（测试需要生产构建）
npm run build

# 运行 E2E 测试
npm run test:e2e

# 有界面模式（可观察测试过程）
npm run test:e2e:headed

# 调试模式
npm run test:e2e:debug
```

### 测试覆盖

| 页面 | 测试内容 |
|------|----------|
| **所有页面** | 7 个页面全部加载无 console 错误 |
| **区块与链** | 哈希演示输出正确；编辑区块后重置恢复 |
| **挖矿与共识** | 设置难度后挖矿，验证找到的哈希满足难度要求 |
| **去中心化网络** | 点击节点后广播动画触发 |
| **UTXO vs 账户** | 显示两种模型的余额示例和对比表 |
| **智能合约** | increment/decrement 更新 count、生成交易/区块/Gas/事件；decrement at zero 显示 revert |
| **应用场景** | 显示代币/DeFi/NFT/ERC-20/ERC-721 等概念 |
| **测验功能** | 选择正确答案显示"正确" |
| **进度追踪** | 浏览页面后进度更新 |

### 查看测试报告

测试完成后，HTML 报告生成在 `site/playwright-report/`：

```bash
npx playwright show-report
```

## 🚀 本地开发

### 运行学习网站

```bash
cd site
npm install
npm run dev
```

访问 http://localhost:5173/solidity-interactive-lab/

### 构建静态文件

```bash
cd site
npm run build
```

构建产物位于 `site/dist/`

## 🔄 CI/CD

本项目配置了 GitHub Actions 自动化流程：

### CI 工作流 (`ci.yml`)
- 在 `pull_request` 和 `push` 到 `master` 时运行
- 构建站点
- 运行 Playwright E2E 测试
- 上传 Playwright 报告和失败时的 traces 作为 artifact

### 部署工作流 (`deploy-pages.yml`)
- 仅在 `push` 到 `master` 时运行
- **先运行 E2E 测试，测试通过后才部署**
- 自动部署到 GitHub Pages
- 上传 Playwright 报告作为 artifact

## 📦 部署到 GitHub Pages

### 首次启用 Pages

仓库管理员需要在 GitHub 仓库设置中启用 Pages：

1. 进入仓库 **Settings → Pages**
2. **Source** 选择 **GitHub Actions**
3. 保存设置

部署完成后，网站将在以下地址可用：
```
https://missminga.github.io/solidity-interactive-lab/
```

## 🌍 自定义域名（Cloudflare）

如需使用自定义域名（如 `blockchain.example.com`），可通过 Cloudflare 配置：

### 1. 在 Cloudflare DNS 添加 CNAME 记录

```
类型: CNAME
名称: blockchain（或你想要的子域名）
目标: missminga.github.io
代理状态: 已代理（橙色云朵）
```

### 2. 在 GitHub 仓库配置自定义域名

1. 进入仓库 **Settings → Pages**
2. 在 **Custom domain** 输入你的域名（如 `blockchain.example.com`）
3. 勾选 **Enforce HTTPS**

### 3. 等待 DNS 生效

通常需要几分钟到几小时，完成后即可通过自定义域名访问。

### 4. 更新 Vite 配置（如需）

如果使用自定义域名，需要修改 `site/vite.config.js` 中的 `base` 配置：

```js
export default defineConfig({
  base: '/', // 改为根路径
  // ...
})
```

## 🎯 学习目标

- 理解区块链的核心概念（无需编码）
- 理解合约部署流程
- 理解状态变更（`increment` / `decrement`）
- 区分"读调用"和"写交易"
- 理解写操作为什么会消耗 Gas

## 📝 下一步建议

1. 在 [Remix IDE](https://remix.ethereum.org) 部署 Counter.sol
2. 增加 `Ownable` 权限控制
3. 尝试更复杂的 DeFi 或 NFT 合约

## 📄 许可证

MIT License
