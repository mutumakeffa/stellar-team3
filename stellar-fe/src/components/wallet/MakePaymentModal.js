import React from "react";
// UI elements
import { Button, Modal, Input } from "@stellar/design-system";
// Types
export const MakePaymentModal = ({
  visible,
  onClose,
  onDone
}) => {
  // 🌎 Handling React local state (state variable and setter function)
  const [destination, setDestination] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [assetCode, setAssetCode] = React.useState("");
  const [assetIssuer, setAssetIssuer] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [isNativeAsset, setIsNativeAsset] = React.useState(false);

  const resetLocalState = () => {
    setDestination("");
    setAmount("");
    setAssetCode("");
    setAssetIssuer("");
    setPincode("");
    setIsNativeAsset(false);
  };

  // 🌎 Resetting local state when modal opens
  React.useEffect(() => {
    if (visible) {
      resetLocalState();
    }
  }, [visible]);

  const handleDone = () => {
    if (!destination || !amount || !assetCode || !pincode) {
      // 🌎 Handle error here
      return;
    }

    if (!isNativeAsset && !assetIssuer) {
      // 🌎 Handle error here
      return;
    }

    onDone({
      destination,
      amount,
      assetCode,
      assetIssuer,
      pincode
    });
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Heading>Make Payment</Modal.Heading>
      <Modal.Body>
        <Input
          id="destination"
          label="Enter destination address"
          onBlur={(e) => setDestination(e.target.value)}
        />
        <Input
          id="amount"
          label="Enter amount"
          onBlur={(e) => setAmount(e.target.value)}
          type="number"
        />
        <Input
          id="assetCode"
          label="Enter asset code"
          onBlur={(e) => {
            setAssetCode(e.target.value);
            setIsNativeAsset(e.target.value === "XLM");
          }}
        />
        <Input
          id="assetIssuer"
          label="Enter asset issuer"
          onBlur={(e) => setAssetIssuer(e.target.value)}
          // 🌎 disabling asset issuer input field for native XLM asset, which
          // does not have asset issuer
          disabled={isNativeAsset}
          note={isNativeAsset ? "XLM is native asset" : null}
        />
        <Input
          id="pincode"
          label="Enter your keystore pincode"
          onBlur={(e) => setPincode(e.target.value)}
          note="Pincode is needed to get the secret key from the keystore"
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
