"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
class Block {
    constructor(timestamp, transactions, previousBlockHash = "") {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousBlockHash = previousBlockHash;
        this.blockHash = this.calculateBlockHash();
        this.nonce = 0;
    }
    /**
     *
     * @returns the hash of the block
     */
    calculateBlockHash() {
        return (0, crypto_js_1.SHA256)(this.timestamp.toLocaleString() + this.transactions
            + this.previousBlockHash + this.nonce).toString();
    }
    mineBlock(difficulty) {
        /**
         * For bitcoin blockchain we know, there are N(difficulty) numbers
         * of preeceding 0s.
         */
        const nZeros = Array(difficulty + 1).join("0"); // difficulty+1 because for Arr length N, there's N-1 elm after join  
        /**
         * Increase the nonce and calculate the block hash until condition meets
         */
        while (!this.blockHash.startsWith(nZeros)) {
            this.nonce++;
            this.blockHash = this.calculateBlockHash();
        }
        // console.log(`Block mined`);
    }
    /**
     * Calls verifyTransaction on each transaction of the block.
     * @returns true/false based on if all the transactions of teh block is valid.
     */
    hasValidTransactions() {
        for (const txn of this.transactions) {
            if (!txn.verifyTransaction()) {
                return false;
            }
        }
        return true;
    }
    /**
     * @prints details of the block
     */
    displayBlock() {
        console.log(JSON.stringify({
            nonce: this.nonce,
            timestamp: new Date(this.timestamp).toLocaleString(),
            transactions: this.transactions,
            previousBlockHash: this.previousBlockHash,
            blockHash: this.blockHash
        }, null, 2));
    }
}
exports.default = Block;
