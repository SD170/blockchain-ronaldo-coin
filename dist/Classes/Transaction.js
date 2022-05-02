"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const elliptic_1 = require("elliptic");
const EC = new elliptic_1.ec("secp256k1"); // this EC algo is used in bitcoin wallets also.
class Transaction {
    constructor(fromAddress, toAddress, amount, data) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.data = data;
    }
    /**
     * This method creates the hash of the transaction.
     * We're going to sign this hash only with our Private key, not all the data, just the hash.
     *
     * @returns hash of the transaction.
     */
    calculateTransactionHash() {
        let hashString = "";
        if (this.fromAddress) {
            hashString += this.fromAddress;
        }
        if (this.toAddress) {
            hashString += this.toAddress;
        }
        if (this.amount) {
            hashString += this.amount;
        }
        if (this.data) {
            hashString += this.data;
        }
        return (0, crypto_js_1.SHA256)(hashString).toString();
    }
    /**
     * Signs a transaction(hash) and saves the signature.
     * @param signingKeyPair Key pair of the user created using EC, or any other elliptic curve library.
     */
    signTransaction(signingKeyPair) {
        // The fromAddress of the transaction is the public key of the user.
        // we can check if the public key is eql to the public key of the signingKeyPair.
        if (signingKeyPair.getPublic("hex") !== this.fromAddress) {
            throw new Error("You can't sign transactions for other wallets");
        }
        // calculating the transaction hash.
        const hashTxn = this.calculateTransactionHash();
        // signing the hash of the transaction with the keyPair (of the sender).
        // The signing gives us a signature.
        // **signing is actually done by the pricvate key.**
        const signature = signingKeyPair.sign(hashTxn, "base64");
        // keeping the signature in hex string.
        this.signature = signature.toDER('hex');
    }
    /**
     * Verifies a transaction by creating the keyPair(Public key) from the fromAddress.
     * Then vefifies the txn with the help of the hash and the signatire.
     *
     * @returns true/false based on the transaction status.
     */
    verifyTransaction() {
        // coinbase transaction/miner's reward case handle.
        if (this.fromAddress === null)
            return true;
        // check if the signature is tehre or not.
        if (!this.signature || this.signature.length === 0) {
            throw new Error("No signature in this transaction");
        }
        // check if the transaction was signed with the correct key.
        // **we can verify a signature using public key.** 
        // creating a keyPair instance from this.fromAddress
        const keyPair = EC.keyFromPublic(this.fromAddress, 'hex');
        // as this keyPair is made from a public key, if we do keyPair.getPrivate()
        // it'll return null. As we know we can't create public key from private key.
        // verifying the transaction
        // we need 1) the keyPair(Pub key) 2) the message which we wanna verify 3) the signature of the sign.
        // the pubkey verifies both the signature and the hash.
        return keyPair.verify(this.calculateTransactionHash(), this.signature);
    }
}
exports.default = Transaction;
