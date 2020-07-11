const options = require('../config/vault');
const vault = require("node-vault")(options);

class VaultService {
  async write(path, data) {
    try {
      const params = JSON.parse(`{"value": "${data}"}`);
      vault.write(path, params).catch(console.error);
    } catch (error) {
      console.error(error);
    }
  }

  async read(path) {
    try {
      return await vault.read(path);
    } catch (error) {
      console.error(error);
    }
  }

  async unseal(keys) {
    keys.map((key) => {
      vault.unseal({
        secret_shares: 1,
        key,
      });
    });
  }

  async polices(name, policy) {
    try {
      vault.policies().then((result) => {
        return vault
          .addPolicy({
            name,
            rules: JSON.stringify(policy),
          })
          .then(async () => {
            await this.createUser([name]);
          });
      });
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(policy) {
    vault
      .tokenCreate({ policies: policy, ttl: "768h", explicit_max_ttl: "768h" })
      .then((result) => {
        console.log(policy, result);
        const newToken = result.auth;
        return vault
          .tokenLookup({ token: newToken.client_token })
          .then(() =>
            vault.tokenLookupAccessor({ accessor: newToken.accessor })
          );
      })
      .then((result) => {
        console.log(policy, result);
      })
      .catch((err) => console.error(err.message));
  }
}

module.exports = new VaultService();
