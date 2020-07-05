var options = {
  apiVersion: "v1",
  endpoint: "http://127.0.0.1:8200",
  token: "s.xxxxxxxxxxxxxxxx",
};

var vaultRoot = require("node-vault")(options);

options.token = 's.yyyyyyyyyyyyyyy';

var vaultClient = require("node-vault")(options);

vaultRoot
  .write("teste/api", { value: "xxxxx-xxxxxx-xxxxx" })
  .then(async () => {
    const result = await vaultClient.read("teste/api");
    console.log(result);
  })
  .then(() => vaultRoot.delete("teste/api"))
  .catch(console.error);





