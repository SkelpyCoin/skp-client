var bip39 = require("bip39");
var skelpyjs = require("skelpyjs");

process.on("message", function(message){

  if(message.string){
    skelpyjs.crypto.setNetworkVersion(message.version);
    var address = "";
    var passphrase;
    var count = 0;
    while(address.toLowerCase().indexOf(message.string) == -1){
      passphrase = bip39.generateMnemonic();
      address = skelpyjs.crypto.getAddress(skelpyjs.crypto.getKeys(passphrase).publicKey);
      if(++count == 10){
        count=0;
        process.send({ count: 10 });
      }
    }
    process.send({ passphrase: passphrase });
  }
});
