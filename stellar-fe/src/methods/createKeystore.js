// 🌎 Import library we’re using to encrypt keystore
import sjcl from "@tinyanvil/sjcl";

export const createKeystore = (keypair, pincode) => {
  // 🚀 Get public key and secret from account’s keypair
  const publicKey = keypair.publicKey();
  const secretKey = keypair.secret();

  return {
    publicKey,
    // 🌎 Encrypt secret key (using pincode provided) in keystore
    keystore: sjcl.encrypt(pincode, secretKey, {
      adata: JSON.stringify({
        publicKey
      })
    })
  };
};
