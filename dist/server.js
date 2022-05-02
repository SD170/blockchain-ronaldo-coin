"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blockchain_1 = __importDefault(require("./Classes/Blockchain"));
const Transaction_1 = __importDefault(require("./Classes/Transaction"));
const elliptic_1 = require("elliptic");
const EC = new elliptic_1.ec("secp256k1"); // this EC algo is used in bitcoin wallets also.
/**
 * Generating a few dummy user.
 * We can create keyPair from a existing private key. (create on by running /dist/keyGen.js)
 * Or we can generate new key pair.
 */
// Generating a keypair from a *DUMMY* private key.
// You can create more *DUMMY* keypair by running dist/keyGen.js
const userKeyPair1 = EC.keyFromPrivate("949bc032dfca9b6b1886b25df60733a64b89bc0e0be9d53e7c3100ccd978c1d5");
const userKeyPair2 = EC.genKeyPair();
const userKeyPair3 = EC.genKeyPair();
const userKeyPair4 = EC.genKeyPair();
// generating the public key/wallet address. Generally wallet addresses are hash of public key.
const userWallet1 = userKeyPair1.getPublic("hex");
const userWallet2 = userKeyPair2.getPublic("hex");
const userWallet3 = userKeyPair3.getPublic("hex");
const userWallet4 = userKeyPair4.getPublic("hex");
/**
 * Creating instance of the blockchain.
 */
const ronaldoCoin = new Blockchain_1.default();
/**
 * Creating BLOCK 1
 */
/**
 * Generating a few transactions.
 */
const txn1 = new Transaction_1.default(userWallet1, userWallet2, 20, null);
const txn2 = new Transaction_1.default(userWallet4, userWallet2, 50, null);
// signing the transaction (for user).
txn1.signTransaction(userKeyPair1); // done by user 1
txn2.signTransaction(userKeyPair4); // done by user 4
/**
 * Adding generated transactions to the block (for miners).
 */
ronaldoCoin.addTransaction(txn1);
ronaldoCoin.addTransaction(txn2);
/**
 * Adding the newly created block to the blockchain (for miners).
 * @param userWallet3 miners's wallet address.
 */
ronaldoCoin.addBlockWithTransactions(userWallet3);
/**
 * getting the balance of an address.
 */
console.log("Balance of userWallet3: ", ronaldoCoin.getBalanceOfAddress(userWallet3));
/**
 * checking if the chain is valid or not.
 */
console.log("Is the chain valid: ", ronaldoCoin.validateBlockchain());
/**
 * Printing the whole blockchain
 */
// Uncomment to view the whole blockchain.
console.log("***Blockchain: ***");
for (let i = 0; i < ronaldoCoin.chain.length; i++) {
    ronaldoCoin.chain[i].displayBlock();
}
console.log("***End***");
/**
 * Creating BLOCK 2
 */
// // Uncomment to create BLOCK 2
// /**
//  * Generating a few transactions.
//  */
// const txn3 = new Transaction(userWallet2, userWallet3, 10, null);
// const txn4 = new Transaction(userWallet2, userWallet4, 20, null);
// // signing the transaction (for user).
// txn3.signTransaction(userKeyPair2); // done by user 2
// txn4.signTransaction(userKeyPair2); // done by user 2
// /**
//  * Adding generated transactions to the block (for miners).
//  */
// ronaldoCoin.addTransaction(txn3);
// ronaldoCoin.addTransaction(txn4);
// /**
//  * Adding the newly created block to the blockchain (for miners).
//  * @param userWallet3 miners's wallet address.
//  */
// ronaldoCoin.addBlockWithTransactions(userWallet3)
// /**
//  * getting the balance of an address.
//  */
//  console.log("Balance of userWallet2: ", ronaldoCoin.getBalanceOfAddress(userWallet2));
//  /**
//   * checking if the chain is valid or not.
//   */
//  console.log("Is the chain valid: ", ronaldoCoin.validateBlockchain());
/**
 * Printing the whole blockchain
 */
// // Uncomment to view the whole blockchain.
// console.log("***Blockchain: ***");
// for (let i = 0; i < ronaldoCoin.chain.length; i++) {
//     ronaldoCoin.chain[i].displayBlock();
// }
// console.log("***End***");
/**
 * Tampering with blockchain example start.
 */
// // Uncomment to tamper with the block chain
// // checking validity of the blockchain;
// console.log("Valid(before tamper): ",ronaldoCoin.validateBlockchain());
// // sending less money
// ronaldoCoin.chain[1].transactions[1].amount=1;
// // making himself as a receiver address of a transaction.
// ronaldoCoin.chain[1].transactions[1].toAddress=userWallet1;
// // even if we re-calculate block hash, transaction will be invalid.
// ronaldoCoin.chain[1].blockHash = ronaldoCoin.chain[1].calculateBlockHash();
// console.log("Valid(after tamper): ",ronaldoCoin.validateBlockchain());
