import Block from "./Classes/Block";
import Blockchain from "./Classes/Blockchain";

/**
 * Creating instance of the blockchain.
 */
const ronaldoCoin = new Blockchain();

// adding a few blocks
/**
 * @params index, timestamp, data
 */
console.log(`Mining block 1`);
ronaldoCoin.addBlock(new Block(1, Date.now(), JSON.stringify({ transactions: ["few transactions"] })));
console.log(`Mining block 2`);
ronaldoCoin.addBlock(new Block(2, Date.now(), JSON.stringify({ transactions: ["few transactions"] })));


console.log("***Blockchain: ***");
for (let i = 0; i < ronaldoCoin.chain.length; i++) {
    ronaldoCoin.chain[i].displayBlock();
}
console.log("***End***");


/**
 * Tampering with blockchain example start.
 */
// // checking validity of the blockchain;
// console.log("Valid(before tamper): ",ronaldoCoin.validateBlockchain());


// // Tampering with the block chain
// ronaldoCoin.chain[1].data = JSON.stringify({ transactions: ["double spend"] });
// ronaldoCoin.chain[1].blockHash = ronaldoCoin.chain[1].calculateBlockHash();

// console.log("Valid(after tamper): ",ronaldoCoin.validateBlockchain());
/**
 * Tampering with blockchain example ends.
 */