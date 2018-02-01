import crypto from 'crypto';
import moment from 'moment';

const getHash = (text) => (crypto.createHash('sha256').update(text).digest('hex'));

class Block {
  constructor({ index, timestamp, data, previousHash }) {
    this.index = index;
    this.timestamp = timestamp || moment();
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.hashBlock();
  }

  hashBlock() {
    const { index, timestamp, data, previousHash } = this;

    return getHash(`${index}${timestamp}${data}${previousHash}`);
  }
}

module.exports = Block;
