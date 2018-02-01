import moment from 'moment';
import Block from './block';

const createGenesisBlock = () => (
  new Block({
    index: 0,
    timestamp: moment(),
    data: 'Genesis Block',
    previousHash: '0'
  })
);

const createNextBlock = ({ previousBlock, data = null }) => (
  new Block({
    index: previousBlock.index + 1,
    data,
    previousHash: previousBlock.hash
  })
);

module.exports = {
  createGenesisBlock,
  createNextBlock
};
