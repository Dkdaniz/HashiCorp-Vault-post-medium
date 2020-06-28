var options = {
  apiVersion: "v1", 
  endpoint: process.env.ENDPOINT || "http://127.0.0.1:8200", 
  token: process.env.TOKEN_VAULT,
};

var vault = require("node-vault")(options);

// // init vault server
// vault.init({ secret_shares: 1, secret_threshold: 1 })
//   .then((result) => {
//     var keys = result.keys;
//     // set token for all following requests
//     vault.token = result.root_token;
//     // unseal vault server
//     return vault.unseal({ secret_shares: 1, key: keys[0] })
//   })
//   .catch(console.error);

vault.write("exchenges/binance", { api: "outro" }).then(async () => {
  const a = await vault.read("exchenges/binance")
  console.log(a);
}).catch(console.error);