# Remix 快速上手

1. 打开 https://remix.ethereum.org
2. 新建 `Counter.sol`，并粘贴 `contracts/Counter.sol` 的内容
3. 编译器版本选择 Solidity `0.8.24`
4. 在部署面板选择 `Injected Provider - MetaMask`
5. 在 Sepolia 测试网部署合约
6. 部署完成后，交互测试以下函数：
   - `count()`（读取当前值）
   - `increment()`（+1）
   - `decrement()`（-1）

## 提示
- `count()` 属于读取调用，通常不消耗链上 Gas。
- `increment()` / `decrement()` 属于写操作，会发起交易并消耗 Gas。
