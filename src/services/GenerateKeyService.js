const crypto = require("crypto");

class GenerateKeyService {
  async generate() {
    const { privateKey, publicKey } = await crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
        cipher: "aes-256-cbc",
        passphrase: "",
      },
    });

    return { privateKey, publicKey };
  }

  async hash(passphrase, secret) {
    const hash = crypto
      .createHmac("sha256", passphrase)
      .update(secret)
      .digest("hex");
    return hash;
  }
}

module.exports = new GenerateKeyService();