import React from "react";
// UI elements
import { Button, Modal, Input } from "@stellar/design-system";

export const SecretKeySignInModal = ({
  visible,
  onClose,
  onDone
}) => {
  // 🌎 Handling React local state (state variable and setter function)
  const [secretKey, setSecretKey] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [pincodeConfirm, setPincodeConfirm] = React.useState("");

  const handleDone = () => {
    if (!secretKey || !pincode || !pincodeConfirm) {
      // 🌎 Handle required fields
      return;
    }

    if (pincode !== pincodeConfirm) {
      // 🌎 Handle no match case
      return;
    }

    onDone(secretKey, pincode);
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Heading>Sign in with a secret key</Modal.Heading>
      <Modal.Body>
        <p>
          Enter a secret key and a pincode to encrypt the keystore data. You’ll
          need to enter it any time you need to use a secret key.
        </p>
        {/* 🌎 Add secret key validation */}
        <Input
          id="secretKey"
          label="Enter your secret key"
          onBlur={(e) => setSecretKey(e.target.value)}
        />
        <Input
          id="pincode"
          label="Enter a keystore pincode"
          onBlur={(e) => setPincode(e.target.value)}
        />
        <Input
          id="pincodeConfirm"
          label="Confirm keystore pincode"
          onBlur={(e) => setPincodeConfirm(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant={Button.variant.secondary} onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleDone}>Sign in</Button>
      </Modal.Footer>
    </Modal>
  );
};
