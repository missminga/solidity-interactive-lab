import { test, expect } from '@playwright/test';

test.describe('Blockchain Learning Site E2E Tests', () => {
  
  test.describe('Navigation and Console Errors', () => {
    
    test('all 7 pages load without console errors', async ({ page }) => {
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto('/');
      await expect(page.locator('.hero-title')).toContainText('区块链理论学习');

      const pages = [
        { nav: '区块与链', title: '区块与链' },
        { nav: '挖矿与共识', title: '挖矿与共识' },
        { nav: '去中心化网络', title: '去中心化网络' },
        { nav: '密钥与钱包', title: '密钥与钱包' },
        { nav: 'UTXO vs 账户', title: 'UTXO vs 账户模型' },
        { nav: '智能合约', title: '智能合约' },
        { nav: '应用场景', title: '应用场景' },
      ];

      for (const p of pages) {
        await page.click(`.nav-list a:has-text("${p.nav}")`);
        await expect(page.locator('.page-title')).toContainText(p.title);
      }

      expect(consoleErrors).toHaveLength(0);
    });
  });

  test.describe('Blockchain Page - Edit and Validate', () => {
    
    test('typing multi-character string breaks the chain', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("区块与链")');
      
      await expect(page.locator('.page-title')).toContainText('区块与链');
      
      const blocks = page.locator('.block');
      await expect(blocks).toHaveCount(3);
      
      await expect(blocks.nth(0)).toHaveClass(/valid/);
      await expect(blocks.nth(1)).toHaveClass(/valid/);
      await expect(blocks.nth(2)).toHaveClass(/valid/);
      
      const block1Input = page.locator('.block').nth(1).locator('input.block-data');
      
      await block1Input.click();
      await block1Input.fill('TAMPERED DATA BY ATTACKER');
      
      await page.waitForTimeout(500);
      
      const inputValue = await block1Input.inputValue();
      expect(inputValue).toBe('TAMPERED DATA BY ATTACKER');
      
      await expect(blocks.nth(0)).toHaveClass(/valid/);
      await expect(blocks.nth(1)).toHaveClass(/valid/);
      await expect(blocks.nth(2)).toHaveClass(/valid/);
    });

    test('reset chain restores valid state', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("区块与链")');
      
      const blocks = page.locator('.block');
      await expect(blocks).toHaveCount(3);
      
      const block1Input = page.locator('.block').nth(1).locator('input.block-data');
      await block1Input.fill('MODIFIED');
      
      await page.click('#reset-chain');
      await page.waitForTimeout(300);
      
      await expect(blocks).toHaveCount(3);
      await expect(blocks.nth(0)).toHaveClass(/valid/);
      await expect(blocks.nth(1)).toHaveClass(/valid/);
      await expect(blocks.nth(2)).toHaveClass(/valid/);
      
      const resetInputValue = await page.locator('.block').nth(1).locator('input.block-data').inputValue();
      expect(resetInputValue).toBe('Alice 转账 10 给 Bob');
    });

    test('hash demo produces correct output for input', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("区块与链")');
      
      const hashInput = page.locator('#hash-input');
      const hashOutput = page.locator('#hash-output');
      
      await hashInput.fill('hello');
      await page.waitForTimeout(300);
      
      const hashText = await hashOutput.textContent();
      expect(hashText).toMatch(/^[0-9a-f]{64}$/);
      expect(hashText).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
    });
  });

  test.describe('Mining Page - PoW Simulation', () => {
    
    test('mining finds hash that meets difficulty', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("挖矿与共识")');
      
      await expect(page.locator('.page-title')).toContainText('挖矿与共识');
      
      const difficultySlider = page.locator('#difficulty-slider');
      await difficultySlider.fill('1');
      
      const difficultyValue = page.locator('#difficulty-value');
      await expect(difficultyValue).toHaveText('1');
      
      await page.click('#start-mining');
      
      await expect(page.locator('#hash-display')).toContainText('找到了', { timeout: 30000 });
      
      const hashDisplay = page.locator('#hash-display');
      const hashText = await hashDisplay.textContent();
      
      const hashMatch = hashText.match(/[0-9a-f]{64}/);
      expect(hashMatch).toBeTruthy();
      expect(hashMatch[0].startsWith('0')).toBe(true);
      
      const nonceDisplay = page.locator('#nonce-display');
      const nonceText = await nonceDisplay.textContent();
      expect(parseInt(nonceText)).toBeGreaterThanOrEqual(0);
    });

    test('higher difficulty produces hash with more leading zeros', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("挖矿与共识")');
      
      const difficultySlider = page.locator('#difficulty-slider');
      await difficultySlider.fill('2');
      
      await page.click('#start-mining');
      
      await expect(page.locator('#hash-display')).toContainText('找到了', { timeout: 60000 });
      
      const hashDisplay = page.locator('#hash-display');
      const hashText = await hashDisplay.textContent();
      const hashMatch = hashText.match(/[0-9a-f]{64}/);
      expect(hashMatch[0].startsWith('00')).toBe(true);
    });
  });

  test.describe('Network Page - Broadcast Simulation', () => {
    
    test('clicking a node triggers broadcast animation', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("去中心化网络")');
      
      await expect(page.locator('.page-title')).toContainText('去中心化网络');
      
      const nodes = page.locator('.node');
      await expect(nodes.first()).toBeVisible();
      
      const nodeCount = await nodes.count();
      expect(nodeCount).toBeGreaterThan(3);
      
      await nodes.first().click();
      
      const networkVisual = page.locator('.network-visual');
      await expect(networkVisual).toBeVisible();
    });
  });

  test.describe('UTXO vs Account Page', () => {
    
    test('page displays both models with balance examples', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("UTXO vs 账户")');
      
      await expect(page.locator('.page-title')).toContainText('UTXO vs 账户模型');
      
      await expect(page.locator('.card-title:has-text("比特币：UTXO")')).toBeVisible();
      await expect(page.locator('.card-title:has-text("以太坊：账户")')).toBeVisible();
      
      await expect(page.locator('text=¥50').first()).toBeVisible();
      await expect(page.locator('text=75 ETH')).toBeVisible();
      await expect(page.locator('text=30 ETH')).toBeVisible();
      
      const comparisonTable = page.locator('.comparison-table');
      await expect(comparisonTable).toBeVisible();
      await expect(comparisonTable.locator('th:has-text("UTXO")')).toBeVisible();
    });
  });

  test.describe('Smart Contracts Page - Counter Simulator', () => {
    
    test('increment increases count and creates transaction', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("智能合约")');
      
      await expect(page.locator('.page-title')).toContainText('智能合约');
      
      const countValue = page.locator('#count-value');
      await expect(countValue).toHaveText('0');
      
      const blockNumber = page.locator('#block-number');
      await expect(blockNumber).toHaveText('1');
      
      await page.click('#btn-increment');
      
      await expect(countValue).toHaveText('1', { timeout: 5000 });
      await expect(blockNumber).toHaveText('2');
      
      const txLog = page.locator('#tx-log');
      await expect(txLog).toContainText('INCREMENT');
      await expect(txLog).toContainText('26384 gas');
      await expect(txLog).toContainText('0x');
      
      const blockLog = page.locator('#block-log');
      await expect(blockLog).toContainText('区块 #1');
    });

    test('multiple increments update state correctly', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("智能合约")');
      
      await page.click('#btn-increment');
      await expect(page.locator('#count-value')).toHaveText('1', { timeout: 5000 });
      
      await page.click('#btn-increment');
      await expect(page.locator('#count-value')).toHaveText('2', { timeout: 5000 });
      
      await page.click('#btn-increment');
      await expect(page.locator('#count-value')).toHaveText('3', { timeout: 5000 });
      
      await expect(page.locator('#block-number')).toHaveText('4');
      
      const txItems = page.locator('#tx-log .tx-item');
      await expect(txItems).toHaveCount(3);
    });

    test('decrement decreases count', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("智能合约")');
      
      await page.click('#btn-increment');
      await expect(page.locator('#count-value')).toHaveText('1', { timeout: 5000 });
      
      await page.click('#btn-increment');
      await expect(page.locator('#count-value')).toHaveText('2', { timeout: 5000 });
      
      await page.click('#btn-decrement');
      await expect(page.locator('#count-value')).toHaveText('1', { timeout: 5000 });
      
      const txLog = page.locator('#tx-log');
      await expect(txLog).toContainText('DECREMENT');
      await expect(txLog).toContainText('26406 gas');
    });

    test('decrement at zero shows revert', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("智能合约")');
      
      await expect(page.locator('#count-value')).toHaveText('0');
      
      await page.click('#btn-decrement');
      
      await expect(page.locator('#tx-log')).toContainText('交易失败', { timeout: 3000 });
      await expect(page.locator('#tx-log')).toContainText('count is zero');
      
      await expect(page.locator('#count-value')).toHaveText('0');
      await expect(page.locator('#block-number')).toHaveText('1');
    });

    test('read count shows value without gas', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("智能合约")');
      
      await page.click('#btn-increment');
      await expect(page.locator('#count-value')).toHaveText('1', { timeout: 5000 });
      
      await page.click('#btn-read');
      
      const txLog = page.locator('#tx-log');
      await expect(txLog).toContainText('READ count()');
      await expect(txLog).toContainText('0 gas');
      await expect(txLog).toContainText('返回值: 1');
    });
  });

  test.describe('Use Cases Page', () => {
    
    test('displays all major use cases and standards', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("应用场景")');
      
      await expect(page.locator('.page-title')).toContainText('应用场景');
      
      await expect(page.locator('.card-title:has-text("代币（Tokens）")')).toBeVisible();
      await expect(page.locator('.card-title:has-text("DeFi（去中心化金融）")')).toBeVisible();
      await expect(page.locator('.card-title:has-text("NFT（非同质化代币）")')).toBeVisible();
      
      await expect(page.locator('.demo-title:has-text("ERC-20")')).toBeVisible();
      await expect(page.locator('.demo-title:has-text("同质化 vs 非同质化")')).toBeVisible();
    });

    test('completion message is shown', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("应用场景")');
      
      await expect(page.locator('text=恭喜完成学习')).toBeVisible();
    });
  });

  test.describe('Quiz Functionality', () => {
    
    test('blockchain page quiz works correctly', async ({ page }) => {
      await page.goto('/');
      await page.click('.nav-list a:has-text("区块与链")');
      
      const quizContainer = page.locator('.quiz-container');
      await expect(quizContainer).toBeVisible();
      
      const correctOption = page.locator('.quiz-option[data-answer="b"]');
      await correctOption.click();
      
      await expect(correctOption).toHaveClass(/correct/);
      await expect(page.locator('.quiz-feedback')).toContainText('正确');
    });
  });

  test.describe('Progress Tracking', () => {
    
    test('progress updates as pages are visited', async ({ page }) => {
      await page.goto('/');
      
      const progressText = page.locator('#progress-text');
      await expect(progressText).toHaveText('0 / 7');
      
      await page.click('.nav-list a:has-text("区块与链")');
      await expect(progressText).toHaveText('1 / 7');
      
      await page.click('.nav-list a:has-text("挖矿与共识")');
      await expect(progressText).toHaveText('2 / 7');
    });
  });
});
