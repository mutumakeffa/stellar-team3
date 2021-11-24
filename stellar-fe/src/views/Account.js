// 🌎 Imports in the file
import React from "react";
import StellarSdk from "stellar-sdk";
import sjcl from "@tinyanvil/sjcl";
// UI elements
import { Button, TextLink, Identicon, Heading4, Heading5 } from "@stellar/design-system";
// Modals
import { EnterPincodeModal } from "../components/wallet/EnterPincodeModal";
import { MakePaymentModal } from "../components/wallet/MakePaymentModal";
// Methods
import { copyToClipboard } from "../methods/copyToClipboard";
import { makePayment } from "../methods/makePayment";

export const Account = ({
  accountKeys,
  accountData,
  refreshAccount,
  signout
}) => {
  // 🌎 Handling React local state (state variable and setter function)
  const [isUiUpdating, setIsUiUpdating] = React.useState(false);
  const [pinModalVisible, setPinModalVisible] = React.useState(false);
  const [trustAssetModalVisible, setTrustAssetModalVisible] = React.useState(
    false
  );
  const [makePaymentModalVisible, setMakePaymentModalVisible] = React.useState(
    false
  );

  // Helpers
  const getKeypairFromKeystore = (pincode) => {
    if (accountKeys?.keystore) {
      try {
        // 🚀 Create keypair from secret key
        return StellarSdk.Keypair.fromSecret(
          // 🌎 Decrypt secret key from keystore
          sjcl.decrypt(pincode, accountKeys.keystore)
        );
      } catch (e) {
        // 🌎 Handle pincode error
      }
    }
  };

  // Action handlers
  const handleCopyAddress = () => {
    // 🌎 Copy public key to clipboard
    copyToClipboard(accountKeys?.publicKey);
  };

  const handleCopySecret = (pincode) => {
    const secretKey = getKeypairFromKeystore(pincode).secret();
    // 🌎 Copy secret key to clipboard
    copyToClipboard(secretKey);
  };

  // const handleTrustAsset = async (
  //   assetCode,
  //   assetIssuer,
  //   pincode
  // ) => {
  //   try {
  //     // 🌎 Indicating that UI is loading
  //     setIsUiUpdating(true);
  //     // 🚀 Get account secret key from keystore
  //     const secretKey = getKeypairFromKeystore(pincode).secret();
  //     // 🚀 trust asset helper method
  //     await trustAsset({ secretKey, assetCode, assetIssuer });
  //     // 🌎 Fetching updated account information
  //     refreshAccount();
  //     // 🌎 Indicating that UI is done loading
  //     setIsUiUpdating(false);
  //   } catch (e) {
  //     // 🌎 Handle trust asset error here
  //     setIsUiUpdating(false);
  //   }
  // };

  const handleMakePayment = async ({
    destination,
    amount,
    assetCode,
    assetIssuer,
    pincode
  }) => {
    try {
      // 🌎 Indicating that UI is loading
      setIsUiUpdating(true);
      // 🚀 Get account secret key from keystore
      const secretKey = getKeypairFromKeystore(pincode).secret();
      // 🚀 make payment helper method
      await makePayment({
        destination,
        amount,
        assetCode,
        assetIssuer,
        secretKey
      });
      // 🌎 Fetching updated account information
      refreshAccount();
      // 🌎 Indicating that UI is done loading
      setIsUiUpdating(false);
    } catch (e) {
      // 🌎 Handle make payment error here
      setIsUiUpdating(false);
    }
  };

  // 🌎 Render Account view UI
  return (
    <div>
      <div className='Welcome__back'>
          <div>
            <Heading5>Welcome back</Heading5>
          </div>
          

          <Button
            onClick={() => setMakePaymentModalVisible(true)}
            isLoading={isUiUpdating}
          >
            Make Payment
          </Button>

          <Button onClick={refreshAccount} isLoading={isUiUpdating}>
            Refresh Account
          </Button>

          <Button onClick={signout}>Logout</Button>
      </div>

      <div className="Cards__section">

        <div className="Account__card">
          <Heading4>Your account address</Heading4>

          {/* 🚀 Display identicon which is a unique icon, generated based on the
          wallet public key */}
          <Identicon publicAddress={accountKeys.publicKey} />

          <div className="Account__copyLinks">
            {/* 🌎 Trigger copy public key action */}
            <TextLink onClick={handleCopyAddress}>Copy Address</TextLink>
            {/* 🌎 Trigger copy secret key action */}
            <TextLink onClick={() => setPinModalVisible(true)}>
              Copy Secret
            </TextLink>
          </div>
        </div>

        <div className="Balances__card">
          <Heading4>Balances</Heading4>
          <table className="Balances">
            <tbody>
              {/* 🚀 Render account balances */}
              {accountData?.balances.map((b) => (
                <tr key={`${b.asset_code}-${b.asset_issuer || "native"}`}>
                  <td>{b.asset_code}</td>
                  <td>{b.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modals */}
      <EnterPincodeModal
        visible={pinModalVisible}
        onClose={() => setPinModalVisible(false)}
        onDone={handleCopySecret}
      />
      {/* <TrustAssetModal
        visible={trustAssetModalVisible}
        onClose={() => setTrustAssetModalVisible(false)}
        onDone={handleTrustAsset}
      /> */}
      <MakePaymentModal
        visible={makePaymentModalVisible}
        onClose={() => setMakePaymentModalVisible(false)}
        onDone={handleMakePayment}
      />
    </div>
  );
};
