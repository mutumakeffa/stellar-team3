import React from "react";
// UI elements
import { Button, Modal, Input } from "@stellar/design-system";
// Types
export const AddUserModal = ({
  visible,
  onClose,
  onDone
}) => {
  // 🌎 Handling React local state (state variable and setter function)
  const [fullname, setFullname] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");

  const resetLocalState = () => {
    setFullname("");
    setPhone("");
    setAmount("");
    setAddress("");
    setCountry("");
    setJobTitle("");
  };

  // 🌎 Resetting local state when modal opens
  React.useEffect(() => {
    if (visible) {
      resetLocalState();
    }
  }, [visible]);

  const handleDone = () => {
    if (!fullname || !amount || !phone ) {
      // 🌎 Handle error here
      return;
    }

    onDone({
      fullname,
      amount,
      phone,
      address,
      country,
      jobTitle
    });
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Heading>Add Employee</Modal.Heading>
      <Modal.Body>
        <Input
          id="fullname"
          label="Enter full name"
          onBlur={(e) => setFullname(e.target.value)}
        />
        <Input
          id="phone"
          label="Enter phone number"
          onBlur={(e) => setPhone(e.target.value)}
          type="number"
          note="This can be mapped as the user's public key"

        />
        <Input
          id="amount"
          label="Enter amount to be paid"
          onBlur={(e) => setAmount(e.target.value)}
          type="number"
        />
        <Input
          id="jobTitle"
          label="Assign Job Title"
          onBlur={(e) => {
            setJobTitle(e.target.value);
          }}
        />
        <Input
          id="country"
          label="Choose country / Location"
          onBlur={(e) => {
            setCountry(e.target.value);
          }}
        />
        
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant={Button.variant.secondary} onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleDone}>Confirm and Proceed</Button>
      </Modal.Footer>
    </Modal>
  );
};
