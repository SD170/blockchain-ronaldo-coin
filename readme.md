# Ronaldo-Coin
## _A blockchain made using TypeScript_

This is a demo blockchain contains features such as Proof of Work(PoW) [with specific difficulty], signing transactions(with private key), verifying transactions(with public key), etc.

Made using TypeScript, also compiled down to javascript.
#### You can check the typescript source code in [_**./src**_](https://github.com/SD170/blockchain-ronaldo-coin/tree/master/src).

## Features

- Proof of Work(PoW) [with specific difficulty].
- Create public/private keys.
- Signing transactions(with private key).
- Verifying transactions(with public key).
- Checking the balance of a specific address.
- Checking the validity of the blockchain.
- Visualizing the whole blockchain.



## Installation

#### 1) Clone the repository:
    git clone https://github.com/SD170/blockchain-ronaldo-coin
#### 2) Install all the dependencies:
On the project root folder, run:
    
    npm install
#### 3) Run the project:
You can run the project easily by using:
```
npm start
```

#### 4) Generate new key-pair(not mandatory):
You can generate a new public/private key pair
```
node ./dist/keyGen.js 
```
Now you can test it in the ./dist/server.js.



## Libraries used

Used a few libraries, few of them we're needed for development only:

- [crypto-js](https://www.npmjs.com/package/crypto-js) - For using related important algorithms such as SHA256.
- [elliptic](https://www.npmjs.com/package/elliptic) - To use EC algorithms for creating Public/Private keys, sign/verify transactions.
- [typescript(Dev)](https://www.npmjs.com/package/typescript) - Used as the base language.
- [ts-node(Dev)](https://www.npmjs.com/package/ts-node) - TypeScript execution and REPL for node.js.
- [node.js](https://nodejs.org/en/) - To run the compiled JS.


#### Thanks for checking it out. Have a great day.

