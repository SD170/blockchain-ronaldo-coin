import Block from './Block';
import Transaction from "./Transaction";

export default class Blockchain {
    public chain: Block[];
    public difficulty: number;
    public pendingTransactions: Transaction[];
    public minerRewardAmount: number;

    constructor() {
        // initializing the chain with genesisblock
        this.chain = [this.createGenesisBlock()];
        // setting a default difficulty
        // for Bitcoin it's set as a variable, so that
        // 1 block generates every 10 mins.
        this.difficulty = 2;

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
    createGenesisBlock(): Block {
        return new Block(Date.now(), [{ fromAddress: null, toAddress: null, amount: null, data: "Genesis block" }], "0");
    }

    /**
     * @returns the latest block
     */
    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Adds a new block to the blockchain.
     * With transaction and other datas
     * @param newBlock an instance of a block
    */
    addBlockWithTransactions(minerAddress: string) {
        
        // // addding miners fee/Coinbase transaction [added at the begining]
        this.pendingTransactions.unshift({ fromAddress: null, toAddress: minerAddress, 
            amount: this.minerRewardAmount, data: "Coinbase transaction" });
            
        // adding pending transactions.
        const newBlock = new Block(Date.now(), this.pendingTransactions);
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

        // making the pending transactions empty
        this.pendingTransactions=[];
    }

    /**
     * Creates an official transaction by adding it to the pending transactions.
     * @param transaction a transaction.
     */
    createTransaction(transaction:Transaction){
        this.pendingTransactions.push(transaction);
    }


    /**
     * @returns true/false by checking the whole blockchain for few parameters.
     */
    validateBlockchain(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

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
     * @deprecated see @addBlockWithTransactions
     * Adds a new block to the blockchain.
     * @param newBlock an instance of a block
    */
    // addBlock(newBlock: Block) {
    //     // setting previousBlockHash
    //     newBlock.previousBlockHash = this.getLatestBlock().blockHash;

    //     /**
    //      * Before PoW
    //      */
    //     // // each time we change any property of a block we need to re-calculate it's hash.
    //     // newBlock.blockHash = newBlock.calculateBlockHash();

    //     /**
    //      * After PoW
    //      */
    //     newBlock.mineBlock(this.difficulty);

    //     // pushing the new block onto the chain.
    //     /**
    //      * In case of a real blockchain there are a lot of checks (for bitcoin blockchain):
    //      * 1) check if the timestamp for this block is bigger then the previous block and less than 2 hrs in future. 
    //      * 2) check if the proof of work on the block is valid or not.
    //      * 3) check if the state transition is valid or not.
    //      * etc.
    //      */

    //     // timestamp check:
    //     // if (newBlock.timestamp > this.getLatestBlock().timestamp) {
    //     this.chain.push(newBlock);
    //     // }
    // }
}