// 🌎 Importing Stellar SDK JS library
import StellarSdk from "stellar-sdk";
// 🌎 Importing constants
import { NETWORK_URL, NETWORK_PASSPHRASE } from "../constants";

export const makePayment = async ({
  amount,
  assetCode,
  assetIssuer,
  destination,
  secretKey
}) => {
  let transaction;
  // 🚀 Creating server instance with Stellar test network
  const server = new StellarSdk.Server(NETWORK_URL);
  // 🚀 Creating keypair from the secret key
  const keypair = StellarSdk.Keypair.fromSecret(secretKey);
  // 🚀 Getting public key from keypair
  const publicKey = keypair.publicKey();

  try {
    // 🚀 Building payment transaction
    transaction = await buildPaymentTransaction({
      amount,
      assetCode,
      assetIssuer,
      destination,
      publicKey,
      server
    });
  } catch (error) {
    // 🌎 Handle error here
    throw new Error("Failed to build transaction");
  }

  try {
    // 🚀 Signing transaction
    await transaction.sign(keypair);
  } catch (error) {
    // 🌎 Handle error here
    throw new Error("Failed to sign transaction");
  }

  // 🚀 Submitting transaction to the network
  return await server.submitTransaction(transaction);
};

const buildPaymentTransaction = async ({
  amount,
  assetCode,
  assetIssuer,
  destination,
  publicKey,
  server
}) => {
  try {
    // 🚀 Getting sequence number from the account
    const { sequence } = await server.loadAccount(publicKey);
    // 🚀 Creating source account instance
    const source = await new StellarSdk.Account(publicKey, sequence);

    // 🚀 For brevity, we are not checking if the destination account is funded
    // or if it has a trustline to the asset (if it is not native XLM).
    // To fund/create a destination account, at least 1 XLM needs to be sent
    // using create account operation.

    // 🚀 Creating asset instance (native or issued)
    const asset =
      !assetCode || assetCode === "XLM"
        ? StellarSdk.Asset.native()
        : new StellarSdk.Asset(assetCode, assetIssuer);

    // 🚀 Creating payment operation
    const operation = StellarSdk.Operation.payment({
      destination,
      asset,
      amount: amount.toString(),
      // 🚀 This flag adds support to send to muxed account (M-address)
      withMuxing: true
    });

    // 🚀 Creating transaction with the operation
    const transaction = new StellarSdk.TransactionBuilder(source, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: NETWORK_PASSPHRASE,
      // 🚀 Setting timebounds to allow enough time to submit the transaction
      timebounds: await server.fetchTimebounds(100)
    }).addOperation(operation);
    // 🚀 Normally we would need to call setTimeout() here, but setting
    // timebounds earlier takes care of it

    // 🚀 Building transaction
    return transaction.build();
  } catch (error) {
    // 🌎 Handle transaction error here
    throw new Error("Transaction failed");
  }
};
