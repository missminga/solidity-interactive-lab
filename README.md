# Solidity 交互式学习实验室

一个面向初学者的智能合约交互项目。

## 项目内容
- `contracts/Counter.sol`：最小可交互计数合约
- `remix/quickstart.md`：基于 Remix 的快速部署步骤

## 学习目标
- 理解合约部署流程
- 理解状态变更（`increment` / `decrement`）
- 区分“读调用”和“写交易”
- 理解写操作为什么会消耗 Gas

## 下一步建议
1. 增加 `Ownable` 权限控制
2. 增加测试（Hardhat / Foundry）
3. 增加一个 ethers.js 小前端用于可视化交互
