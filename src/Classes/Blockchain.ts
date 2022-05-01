import Block from "../Classes/Block";
import { SHA256 } from 'crypto-js';


class Blockchain {
    public chain: Block[];

    constructor() {
        this.chain = [];
        // initializing the chain with genesisblock
        this.chain.push(this.createGenesisBlock());

    }

    /**
     * Genesis block: first block of the blockchain.
     * prev hash is 0.
     * 
     * @returns the genesis block
     */
    createGenesisBlock(): Block {
        return new Block(0, new Date(), "Genesis block", "0");
    }

    /**
     * @returns the latest block
     */
    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock: Block) {
        newBlock.previousBlockHash = this.getLatestBlock().blockHash;
        // each time we change any property of a block we need to re-calculate it's hash.
        newBlock.blockHash = newBlock.calculateBlockHash();
        // pushing the new block onto the chain.
        /**
         * In case of a real blockchain there are a lot of checks (for bitcoin blockchain):
         * 1) check if the timestamp for this block is bigger then the previous block and less than 2 hrs in future. 
         * 2) check if the proof of work on the block is valid or not.
         * 3) check if the state transition is valid or not.
         * etc.
         */
        
        // timestamp check
        if(newBlock.timestamp > this.getLatestBlock().timestamp && (newBlock.timestamp.valueOf() - this.getLatestBlock().timestamp.valueOf()) < 7.2e+6){
            this.chain.push(newBlock);
        }
    }
}