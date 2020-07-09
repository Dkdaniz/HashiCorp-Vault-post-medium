var options = {
  apiVersion: "v1",
  endpoint: process.env.endpoint || "",
  token: process.env.tokenVault || "",
};

var vault = require("node-vault")(options);

const police_balance = require('../policies/policy-balance.json');
const police_order = require('../policies/policy-order.json');

class VaultService {
  execute(data, encryption) {
    const { type, exchange } = data;
    const params = JSON.parse(`{"value": "${encryption}"}`);

    vault
      .write(`exchanges/${exchange}/${type}`, params)
      .catch(console.error);
  }

  unseal(keys) {
    keys.map(key => {
      vault.unseal({
        secret_shares: 1,
        key,
      });
    });
  }

  async polices() {
    try {
      vault.policies().then((result) => {
        return vault.addPolicy({
          name: 'balances',
          rules: JSON.stringify(police_balance),
        }).then(async () => {
          await this.createUser("balances");
        });
      })

      vault.policies().then((result) => {
        return vault.addPolicy({
          name: 'orders',
          rules: JSON.stringify(police_order),
        }).then(async () => {
          await this.createUser("orders");
        });
      })
    } catch (error) {
      console.error(error)
    }
  }

  async createUser(policy) {
    vault.tokenCreate({ "policies": [`${policy}`], "ttl": "768h", "explicit_max_ttl":"768h"})
      .then((result) => {
        console.log(policy, result);
        const newToken = result.auth;
        return vault.tokenLookup({ token: newToken.client_token })
          .then(() => vault.tokenLookupAccessor({ accessor: newToken.accessor }));
      })
      .then((result) => {
        console.log(policy, result);
      })
      .catch((err) => console.error(err.message));
  }
}

module.exports = new VaultService();
