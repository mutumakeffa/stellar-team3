import React from "react";
// UI elements
import { Heading2, Button } from "@stellar/design-system";
// Modals
import { SecretKeySignInModal } from "../components/wallet/SecretKeySignInModal";
import { SetPincodeModal } from "../components/wallet/SetPincodeModal";

export const Intro = ({
  createAndSetAccount,
  signInWithSecretKey,
  isUiUpdating
}) => {
  // 🌎 Handling React local state (state variables and setter functions)
  const [newPinModalVisible, setNewPinModalVisible] = React.useState(false);
  const [secretKeyModalVisible, setSecretKeyModalVisible] = React.useState(
    false
  );

  // 🌎 Render Intro view UI
  return (
    <div>
      <Heading2>Welcome. Make an account</Heading2>

      <div className="Intro__buttons">
        {/* 🌎 Show modal to generate new account */}
        <Button
          onClick={() => setNewPinModalVisible(true)}
          isLoading={isUiUpdating}
        >
          Generate keypair for new account
        </Button>

        {/* 🌎 Show modal to sign in with a secret key */}
        <Button onClick={() => setSecretKeyModalVisible(true)}>
          Sign in with a secret key
        </Button>
      </div>

      {/* Modals */}
      <SetPincodeModal
        visible={newPinModalVisible}
        onClose={() => setNewPinModalVisible(false)}
        onDone={createAndSetAccount}
      />
      <SecretKeySignInModal
        visible={secretKeyModalVisible}
        onClose={() => setSecretKeyModalVisible(false)}
        onDone={signInWithSecretKey}
      />
    </div>
  );
};
