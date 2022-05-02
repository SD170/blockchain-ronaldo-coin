import { SHA256 } from "crypto-js";



export default class Block {
    public index: number;                // for easily searching a block
    public timestamp: number;            // timestamp in milisecond
    public data: string;                 // any kind of data that can reside on the block
    public previousBlockHash: string;    // hash of the previous block
    public blockHash: string;            // current block's hash
    public nonce: number;                // Random number needed for PoW
    constructor(index: number, timestamp: number, data: string, previousBlockHash: string = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousBlockHash = previousBlockHash;
        this.blockHash = this.calculateBlockHash();
        this.nonce = 0;
    }

    /**
     * 
     * @returns the hash of the block
     */
    calculateBlockHash(): string {
        return SHA256(this.index + this.timestamp.toLocaleString()
            + this.data + this.previousBlockHash + this.nonce).toString();
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
        while (!this.blockHash.startsWith(nZeros)){
            this.nonce++;
            this.blockHash = this.calculateBlockHash();
        }
        
        console.log(`Block ${this.index} mined`);
    }


    /**
     * @prints details of the block
     */
    displayBlock() {
        console.log(JSON.stringify({
            index: this.index,
            nonce: this.nonce,
            timestamp: new Date(this.timestamp).toLocaleString(),
            data: this.data,
            previousBlockHash: this.previousBlockHash,
            blockHash: this.blockHash
        }, null, 2));
    }
}