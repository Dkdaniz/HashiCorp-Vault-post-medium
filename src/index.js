const VaultService = require("./src/services/VaultService.js");
const CryptoService = require("./src/services/CryptoService.js");
const GenerateKeyService = require("./src/services/GenerateKeyService.js");
const parseExchanges = require("./src/utils/parseExchanges.js");

syncVault = async () => {
  const apiKeys = [];
  const hash = await GenerateKeyService.hash('','');

  console.log("\n\n HASH \n\n");
  console.log(hash);
  console.log("\n\n HASH \n\n");

  const data = await CSVConvertService.execute();
  data.map(value => {
    const response = parseExchanges.setApiKeys(value);
    apiKeys.push(response[0]);
    apiKeys.push(response[1]);
  })

  apiKeys.map(keys => {
    const encrypt = CryptoService.encrypt(hash, JSON.stringify(keys));
    VaultService.execute(keys, encrypt);
  })

  await VaultService.polices();
 };

syncVault();