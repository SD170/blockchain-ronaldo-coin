import Block from "./Classes/Block";
import Blockchain from "./Classes/Blockchain";
import Transaction from "./Classes/Transaction";

/**
 * Creating instance of the blockchain.
 */
const ronaldoCoin = new Blockchain();

// creating a few transactions

ronaldoCoin.createTransaction({ fromAddress: "messi", toAddress: "mbappe", amount: 20, data:null })
ronaldoCoin.createTransaction({ fromAddress: "benzema", toAddress: "marcelo", amount: 50, data:null })

// creating a new block with these transactions.
ronaldoCoin.addBlockWithTransactions("minerRonaldo")


// creating a few transactions

ronaldoCoin.createTransaction({ fromAddress: "lewandowski", toAddress: "muller", amount: 200, data:null })
ronaldoCoin.createTransaction({ fromAddress: "kane", toAddress: "son", amount: 10, data:null })

// creating a new block with these transactions.
ronaldoCoin.addBlockWithTransactions("minerRonaldo")

// adding a few blocks
/**
 * @params index, timestamp, data
 */
// console.log(`Mining block 1`);
// ronaldoCoin.addBlock(new Block(Date.now(), { transactions: [{ fromAddress: "messi", toAddress: "mbappe", amount: 20 }] }));
// console.log(`Mining block 2`);
// ronaldoCoin.addBlock(new Block(Date.now(), { transactions: [{ fromAddress: "benzema", toAddress: "marcelo", amount: 50 }] }));


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