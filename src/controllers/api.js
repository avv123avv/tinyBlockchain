import express from 'express';
import request from 'request';

import { createGenesisBlock, createNextBlock } from '../core/create';
import minerAddress from '../core/address';
import Blocks from '../models/blocks';
import Transactions from '../models/transactions';

const router = express.Router();

const peerNodes = [];

const createBlockchain = () => {
  return Blocks.fetchAll()
    .then(blocks => {
      if (blocks.length < 1) {
        return new Blocks(createGenesisBlock()).save();
      }
    })
    .catch(error => {
      console.error('createBlockchain error:', error);
    });
};

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

  otherChains.forEach((chain) => {
    Blocks.fetch({ index: chain.index }).then((block) => {
      if (!block) {
        new Blocks(block.toJSON()).save().catch(error => console.error('consensus error:', error));
      }
    });
  });
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

createBlockchain();

router.post('/txion', (req, res) => {
  const nt = req.body;

  if (!nt.from
  && !nt.to
  && !nt.amount) {
    return res.status(500).json({ error: 'Error in data\'s body' });
  }
  return new Transactions(nt).save().then(() => {
    return res.send(nt);
  }).catch(error => res.status(500).json({ error }));
});

router.get('/mine', (req, res) => {
  return Blocks.getLastBlock().then(previousBlock => {
    const lastProof =  previousBlock && previousBlock.data ? previousBlock.data.proofOfWork : null;
    const proof = proofOfWork(lastProof);

    return new Transactions({
      from: 'network',
      to: minerAddress,
      amount: 1
    }).save().then(() => {
      return Transactions.fetchAll().then(ourTransactions => {
        const data = {
          proofOfWork: proof,
          transactions: JSON.stringify(ourTransactions)
        };

        const minedBlock = createNextBlock({ data: JSON.stringify(data), previousBlock });

        return new Blocks(minedBlock).save().then(() => res.json(minedBlock))
          .catch(error => res.status(500).json({ error }));
      });
    }).catch(error => res.status(500).json({ error }));
  });
});

router.get('/blocks', (req, res) => {
  consensus();
  return Blocks.fetchAll().then((blockchain) => {
    const chainToSend = blockchain.map((block) => ({
      index: block.toJSON().index,
      timestamp: block.toJSON().timestamp,
      data: block.toJSON().data,
      hash: block.toJSON().hash
    }));

    return res.json(chainToSend);
  }).catch(error => res.status(500).json({ error }));
});

export default router;

