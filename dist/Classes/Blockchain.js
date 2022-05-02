"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = __importDefault(require("./Block"));
const Transaction_1 = __importDefault(require("./Transaction"));
class Blockchain {
    constructor() {
        // initializing the chain with genesisblock
        this.chain = [this.createGenesisBlock()];
        // setting a default difficulty
        // for Bitcoin it's set as a variable, so that
        // 1 block generates every 10 mins.
        this.difficulty = 4;
        // intializing an empty array for pendingTransactions
        this.pendingTransactions = [];
        // setting the miner reward
        this.minerRewardAmount = 100;
    }
    /**
     * Genesis block: first block of the blockchain.
     * prev hash is 0.
     *
     * @returns the genesis block
     */
    createGenesisBlock() {
        // Creating a dummy genesis block transaction
        return new Block_1.default(Date.now(), [], "0");
    }
    /**
     * @returns the latest block
     */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    /**
     * Adds a new block to the blockchain.
     * With transaction and other datas
     * @param newBlock an instance of a block
    */
    addBlockWithTransactions(minerAddress) {
        // creating coinbase transaction
        const coinbaseTxn = new Transaction_1.default(null, minerAddress, this.minerRewardAmount, "Coinbase transaction");
        // addding miners fee/Coinbase transaction [added at the begining of the prending txns]
        this.pendingTransactions.unshift(coinbaseTxn);
        // adding pending transactions.
        const newBlock = new Block_1.default(Date.now(), this.pendingTransactions);
        // setting previousBlockHash
        newBlock.previousBlockHash = this.getLatestBlock().blockHash;
        /**
         * Before PoW
         */
        // // each time we change any property of a block we need to re-calculate it's hash.
        // newBlock.blockHash = newBlock.calculateBlockHash();
        /**
         * After PoW
         */
        console.log(`Mining started for block ${this.chain.length}`);
        newBlock.mineBlock(this.difficulty);
        console.log(`Mining Ended for block ${this.chain.length}`);
        // pushing the new block onto the chain.
        /**
         * In case of a real blockchain there are a lot of checks (for bitcoin blockchain):
         * 1) check if the timestamp for this block is bigger then the previous block and less than 2 hrs in future.
         * 2) check if the proof of work on the block is valid or not.
         * 3) check if the state transition is valid or not.
         * etc.
         */
        // timestamp check:
        // if (newBlock.timestamp > this.getLatestBlock().timestamp) {
        this.chain.push(newBlock);
        // }
        // making the pending transactions empty
        this.pendingTransactions = [];
    }
    /**
     * Adds a transaction to the pending transactions.
     * @param transaction a transaction.
     */
    addTransaction(transaction) {
        // checking if the transaction is valid or not.
        if (!transaction.verifyTransaction()) {
            throw new Error("Can't add invalid transactions to the chain");
        }
        // checking if all fields are filled
        if (transaction.fromAddress && transaction.toAddress && transaction.amount && transaction.amount > 0) {
            this.pendingTransactions.push(transaction);
        }
        else {
            throw new Error("Transactions must have fromAddress, toAddress, amount");
        }
    }
    /**
     * @returns true/false by checking the whole blockchain for few parameters.
     */
    validateBlockchain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            // if the current block doesn't have all valid transactions
            if (!currentBlock.hasValidTransactions()) {
                return false;
            }
            // if the hash on the current block is invalid
            if (currentBlock.blockHash !== currentBlock.calculateBlockHash()) {
                return false;
            }
            // if the previousBlockHash of the current block is not equal to
            // previousBlock's blockHash.
            if (currentBlock.previousBlockHash !== previousBlock.blockHash) {
                return false;
            }
        }
        return true;
    }
    /**
     * Loops through the whole blockchain and calculates the balance of a gicen address.
     * @param address balance of the address we want.
     * @returns the balance.
     */
    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.fromAddress === address && transaction.amount) {
                    balance -= transaction.amount;
                }
                if (transaction.toAddress === address && transaction.amount) {
                    balance += transaction.amount;
                }
            }
        }
        return balance;
    }
    /**
     * @deprecated see @addBlockWithTransactions
     * Adds a new block to the blockchain.
     * @param newBlock an instance of a block
    */
    addBlock(newBlock) {
        // setting previousBlockHash
        newBlock.previousBlockHash = this.getLatestBlock().blockHash;
        /**
         * Before PoW
         */
        // // each time we change any property of a block we need to re-calculate it's hash.
        // newBlock.blockHash = newBlock.calculateBlockHash();
        /**
         * After PoW
         */
        newBlock.mineBlock(this.difficulty);
        // pushing the new block onto the chain.
        /**
         * In case of a real blockchain there are a lot of checks (for bitcoin blockchain):
         * 1) check if the timestamp for this block is bigger then the previous block and less than 2 hrs in future.
         * 2) check if the proof of work on the block is valid or not.
         * 3) check if the state transition is valid or not.
         * etc.
         */
        // timestamp check:
        // if (newBlock.timestamp > this.getLatestBlock().timestamp) {
        this.chain.push(newBlock);
        // }
    }
}
exports.default = Blockchain;
