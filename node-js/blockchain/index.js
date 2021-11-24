var crypto = require("crypto");

// Transfer of funds between two wallets
class Transaction {
  constructor(amount, payer, payee) {
    this.amount = amount;
    this.payer = payer;
    this.payee = payee;
  }
  toString() {
    return JSON.stringify(this);
  }
}

// Individual block on the chain
class Block {

  nonce = Math.round(Math.random() * 999999999);

  constructor(prevHash, transaction, ts = Date.now()) {
    this.prevHash = prevHash;
    this.transaction = transaction;
    this.ts = ts;
  }

  get hash() {
    var str = JSON.stringify(this);
    var hash = crypto.createHash('SHA256');
    hash.update(str).end();
    return hash.digest('hex');
  }
}


// The blockchain
class Chain {
  // Singleton instance
  static instance = new Chain();

  constructor() {
    this.chain = [
      // Genesis block
      new Block('', new Transaction(100, 'genesis', 'satoshi'))
    ];
  }

  // Most recent block
  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Proof of work system
  mine(nonce) {
    var solution = 1;
    console.log('⛏️  mining...')

    while (true) {

      var hash = crypto.createHash('MD5');
      hash.update((nonce + solution).toString()).end();

      var attempt = hash.digest('hex');

      if (attempt.substr(0, 4) === '0000') {
        console.log(`Solved: ${solution}`);
        return solution;
      }

      solution += 1;
    }
  }

  // Add a new block to the chain if valid signature & proof of work is complete
  addBlock(transaction, senderPublicKey, signature) {
    var verify = crypto.createVerify('SHA256');
    verify.update(transaction.toString());

    var isValid = verify.verify(senderPublicKey, signature);

    if (isValid) {
      var newBlock = new Block(this.lastBlock.hash, transaction);
      this.mine(newBlock.nonce);
      this.chain.push(newBlock);
    }
  }

}

// Wallet gives a user a public/private keypair
class Wallet {

  constructor() {
    var keypair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    this.privateKey = keypair.privateKey;
    this.publicKey = keypair.publicKey;
  }

  sendMoney(amount, payeePublicKey) {
    var transaction = new Transaction(amount, this.publicKey, payeePublicKey);

    var sign = crypto.createSign('SHA256');
    sign.update(transaction.toString()).end();

    var signature = sign.sign(this.privateKey);
    Chain.instance.addBlock(transaction, this.publicKey, signature);
  }
}

// Example usage

var satoshi = new Wallet();
var bob = new Wallet();
var alice = new Wallet();

satoshi.sendMoney(50, bob.publicKey);
bob.sendMoney(23, alice.publicKey);
alice.sendMoney(5, bob.publicKey);

console.log(JSON.stringify(Chain.instance, null, 2));


