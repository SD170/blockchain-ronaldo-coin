import { SHA256 } from "crypto-js";



export default class Block {
    public index: number;                // for easily searching a block
    public timestamp: number;            // timestamp in milisecond
    public data: string;                 // any kind of data that can reside on the block
    public previousBlockHash: string;    // hash of the previous block
    public blockHash: string;            // current block's hash
    constructor(index: number, timestamp: number, data: string, previousBlockHash: string = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousBlockHash = previousBlockHash;
        this.blockHash = this.calculateBlockHash();
    }

    /**
     * 
     * @returns the hash of the block
     */
    calculateBlockHash(): string {
        return SHA256(this.index + this.timestamp.toLocaleString()
            + this.data + this.previousBlockHash).toString();
    }

    displayBlock() {
        console.log(JSON.stringify({
            index: this.index,
            timestamp: new Date(this.timestamp).toLocaleString(),
            data: this.data,
            previousBlockHash: this.previousBlockHash,
            blockHash: this.blockHash
        }, null, 2));
    }
}