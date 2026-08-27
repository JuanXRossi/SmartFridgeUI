"use client";
import { ReactNode, useState } from "react";
import SignupModal from "./SignupModal";
import Modal from "./ui/Modal";

const styles = {
  wrapperClickArea: "",
  successContent: "text-center space-y-4",
  successIcon: "mx-auto h-12 w-12 text-emerald-500",
  successTitle: "text-lg font-semibold text-slate-900",
  successMessage: "text-sm text-slate-600",
  successEmail: "font-medium text-sky-700",
  closeButton:
    "w-full bg-sky-600 hover:bg-sky-700 text-white rounded-md py-2 font-medium mt-4",
};

export default function SignupModalClientWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  function onOpen() { setOpen(true); }
  function onClose() { setOpen(false); }

  function onSuccess(email: string) {
    setRegisteredEmail(email);
    setShowConfirmationModal(true);
  }

  return (
    <>
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (
            target?.id === "heroSignup" ||
            target.closest?.("#heroSignup")
          ) {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        {children}
      </div>

      <SignupModal open={open} onClose={onClose} onSuccess={onSuccess} />

      <Modal
        open={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        title="Confirma tu correo"
        id="email-confirmation-info"
      >
        <div className={styles.successContent}>
          <p className={styles.successMessage}>
            Te enviamos un correo de confirmación a{" "}
            <span className={styles.successEmail}>{registeredEmail}</span>.
            Revisá tu bandeja de entrada y haz clic en el enlace para activar tu
            cuenta.
          </p>
          <button
            className={styles.closeButton}
            onClick={() => setShowConfirmationModal(false)}
          >
            Entendido
          </button>
        </div>
      </Modal>
    </>
  );
}
