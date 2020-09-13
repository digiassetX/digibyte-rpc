# digibyte-rpc



## Installation
``` bash
npm install digibyte-rpc
```

## Usage
``` javascript
const DigiByteRPC=require('digibyte-rpc');
let dgbWallet=new DigiByte('username','password','localhost',14022);
let height=dgbWallet.getBlockCount();  //or any command on https://developer.bitcoin.org/reference/rpc/index.html
console.log(height);
```