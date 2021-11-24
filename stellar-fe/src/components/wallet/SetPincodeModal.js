import React from "react";
// UI elements
import { Button, Modal, Input } from "@stellar/design-system";

export const SetPincodeModal = ({
  visible,
  onClose,
  onDone
}) => {
  // 🌎 Handling React local state (state variable and setter function)
  const [pincode, setPincode] = React.useState("");
  const [pincodeConfirm, setPincodeConfirm] = React.useState("");

  const handleDone = () => {
    if (!pincode || !pincodeConfirm) {
      // 🌎 Handle error here
      return;
    }

    if (pincode !== pincodeConfirm) {
      // 🌎 Handle no match case error here
      return;
    }

    onDone(pincode);
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Heading>Generate keypair</Modal.Heading>
      <Modal.Body>
        <p>
          Enter a pincode to encrypt the keystore data. You’ll need to enter it
          any time you need to use a secret key.
        </p>
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
        <Button onClick={handleDone}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};
