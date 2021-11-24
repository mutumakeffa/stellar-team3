// UI elements
import { Button, Modal } from "@stellar/design-system";

export const SignOutModal = ({
  visible,
  onClose,
  onDone
}) => {
  const handleDone = () => {
    onDone();
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Heading>Sign out</Modal.Heading>
      <Modal.Body>
        <p>
          Are you sure? This will remove saved account information from the
          local storage. Your account will not be affected.
        </p>
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
