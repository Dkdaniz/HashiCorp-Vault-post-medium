const vaultService = require('./services/VaultService');

const syncVault = async () => {
  await vaultService.write('api/token', 'xxxxxxxxxxxxxxxx');

  const { data } = await vaultService.read("api/s");
  console.log(data);
} 

syncVault();
