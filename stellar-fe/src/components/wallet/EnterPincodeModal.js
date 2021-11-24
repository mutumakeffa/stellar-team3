import React from "react";
// UI elements
import { Button, Modal, Input } from "@stellar/design-system";

export const EnterPincodeModal = ({
  visible,
  onClose,
  onDone
}) => {
  // 🌎 Handling React local state (state variable and setter function)
  const [pincode, setPincode] = React.useState("");

  const handleDone = () => {
    if (!pincode) {
      // 🌎 Handle error here
      return;
    }

    onDone(pincode);
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Heading>Copy secret key</Modal.Heading>
      <p>Enter the pincode you used to encrypt the keystore data.</p>
      <Modal.Body>
        <Input
          id="pincode"
          label="Enter your keystore pincode"
          onBlur={(e) => setPincode(e.target.value)}
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
