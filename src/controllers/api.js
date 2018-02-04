import express from 'express';
import request from 'request';

import Block from '../core/block';
import { createGenesisBlock, createNextBlock } from '../core/create';
import minerAddress from '../core/address';

const router = express.Router();

let blockchain = [];
let ourTransactions = [];
const peerNodes = [];
const mining = true;

blockchain.push(createGenesisBlock());

const proofOfWork = (lastProof) => {
  if (!lastProof) return 1;
  let incrementor = lastProof + 1;

  while (!(incrementor % 9 === 0 && incrementor % lastProof === 0)) {
    incrementor += 1;
  }
  return incrementor;
};

const consensus = () => {
  const otherChains = findNewChains();
  let longestChain = blockchain;

  otherChains.forEach((chain) => {
    if (longestChain.length < chain.length) {
      longestChain = chain;
    }
  });
  blockchain = longestChain;
};

const findNewChains = () => {
  const otherChains = [];

  peerNodes.forEach((node) => {
    request({ uri: `${node}/blocks` }, (err, res, body) => {
      if (err) {
        console.warn(err);
        return;
      }
      otherChains.push(JSON.parse(body));
    });
  });
  return otherChains;
};

router.post('/txion', (req, res) => {
  const nt = req.body;

  ourTransactions.push(nt);

  return res.send(`
    New transaction:
    FROM: ${nt.from}
    TO: ${nt.to}
    AMOUNT: ${nt.amount}
    Submission successful
  `);
});

router.get('/mine', (req, res) => {
  console.log('test');
  const lastBlock = blockchain[blockchain.length - 1];
  const lastProof = lastBlock.data.proofOfWork;
  const proof = proofOfWork(lastProof);

  ourTransactions.push({
    from: 'network',
    to: minerAddress,
    amount: 1
  });

  const data = {
    proofOfWork: proof,
    transactions: ourTransactions
  };

  const index = lastBlock.index + 1;
  const previousHash = lastBlock.hash;

  ourTransactions = [];

  const minedBlock = new Block({ index, previousHash, data });

  blockchain.push(minedBlock);

  return res.json(minedBlock);
});

router.get('/blocks', (req, res) => {
  consensus();
  const chainToSend = blockchain;

  Array(chainToSend.length).fill().forEach((_, i) => {
    const block = chainToSend[i];
    const blockIndex = block.index;
    const blockTimestamp = block.timestamp;
    const blockData = block.data;
    const blockHash = block.hash;

    chainToSend[i] = {
      index: blockIndex,
      timestamp: blockTimestamp,
      data: blockData,
      hash: blockHash
    };
  });

  return res.json(chainToSend);
});

export default router;

