import { ReactNode, useEffect, useRef, useState } from "react";
import "~/styles/modal.css";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export function Modal({ children, isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [isModalOpen, setModalOpen] = useState(isOpen);

  function handleCloseModal() {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  }

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const ref = modalRef.current;
    if (ref) {
      ref[isModalOpen ? "showModal" : "close"];
    }
  }, [isModalOpen]);

  return (
    <dialog ref={modalRef} className="modal">
      {children}
      <button onClick={handleCloseModal}>Закрыть</button>
    </dialog>
  );
}
