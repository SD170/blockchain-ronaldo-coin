"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elliptic_1 = require("elliptic");
// this elliptic curve library has methods to create PK and SK. It can sign and verify also.
const EC = new elliptic_1.ec("secp256k1"); // this EC algo is used in bitcoin wallets also.
const keyPair = EC.genKeyPair();
const publicKey = keyPair.getPublic('hex');
const privateKey = keyPair.getPrivate('hex');
console.log("public key: ", publicKey);
console.log("private key: ", privateKey);
