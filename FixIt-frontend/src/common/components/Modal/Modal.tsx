import { Modal as MantineModal } from "@mantine/core";

interface ModalProps {
  isOpen: boolean;
  keepMounted?: boolean;
  maxWidth?: number | string;
  children: React.ReactNode;
  closeOnBackdropClick?: boolean;
  onClose: () => void;
}

const Modal = ({
  isOpen,
  keepMounted = false,
  maxWidth = 500,
  children,
  closeOnBackdropClick = true,
  onClose,
}: ModalProps) => {
  return (
    <MantineModal
      opened={isOpen}
      onClose={onClose}
      centered
      withCloseButton={false}
      closeOnEscape
      closeOnClickOutside={closeOnBackdropClick}
      keepMounted={keepMounted}
      size={typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth}
      overlayProps={{
        backgroundOpacity: 0.4,
        color: `#000`,
      }}
      transitionProps={{
        transition: "pop",
        duration: 200,
      }}
      styles={{
        content: {
          backgroundColor: "var(--mantine-color-dark-7)",
          color: "var(--mantine-color-dark-0)",
          border: "1px solid var(--mantine-color-dark-5)",
          borderRadius: 12,
          boxShadow: "0 8px 40px rgba(0, 0, 0, 0.5)",
        },
        body: {
          padding: 24,
        },
      }}
    >
      {children}
    </MantineModal>
  );
};

export default Modal;
