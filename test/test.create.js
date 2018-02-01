import { expect } from 'chai';

import { createGenesisBlock, createNextBlock } from '../src/core/create';

describe('Test Blockchain core work', () => {
  let block = {};

  describe('createGenesisBlock', () => {
    it('creates the 0 block of blockchain', () => {
      block = createGenesisBlock();
      console.log('Block #1 has been added to the blockchain');
      console.log(`Hash: ${block.previousHash}`);
      console.log();
    });
  });

  describe('createNextBlock', () => {
    it('creates next block 10 times', () => {
      for (let i = 1; i <= 10; i++) {
        block = createNextBlock({ previousBlock: block });
        console.log(`Block #${i + 1} has been added to the blockchain`);
        console.log(`Hash: ${block.previousHash}`);
        console.log();
      }
    });
  });
});
