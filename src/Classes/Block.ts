import { SHA256 } from "crypto-js";
import Transaction from "./Transaction";


export default class Block {
    public timestamp: number;            // timestamp in milisecond
    public transactions: Transaction[];  // Transactions array
    public previousBlockHash: string;    // hash of the previous block
    public blockHash: string;            // current block's hash
    public nonce: number;                // Random number needed for PoW
    constructor(timestamp: number, transactions: Transaction[], previousBlockHash: string = "") {
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
    calculateBlockHash(): string {
        return SHA256(this.timestamp.toLocaleString() + this.transactions
            + this.previousBlockHash + this.nonce).toString();
    }

    mineBlock(difficulty: number) {
        /**
         * For bitcoin blockchain we know, there are N(difficulty) numbers
         * of preeceding 0s.
         */

        const nZeros = Array(difficulty + 1).join("0");   // difficulty+1 because for Arr length N, there's N-1 elm after join  

        /**
         * Increase the nonce and calculate the block hash until condition meets
         */
        while (!this.blockHash.startsWith(nZeros)) {
            this.nonce++;
            this.blockHash = this.calculateBlockHash();
        }

        console.log(`Block mined`);
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