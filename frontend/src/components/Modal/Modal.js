import React from "react";
import ReactDom from "react-dom";
import { useTranslations } from "../../containers/useTranslations";
import styles from "./styles.module.css";

const Modal = ({ children, onCloseClick, allowClose }) => {
  const [v, q] = useTranslations();
  console.log("MODAL");
  const root = document.getElementById("modal_root");

  return ReactDom.createPortal(
    <div className={styles.modal}>
      <div className={styles.content}>
        {allowClose && (
          <span onClick={onCloseClick} className={styles.close}>
            &times;
          </span>
        )}
        {children}
      </div>
    </div>,
    root
  );
};
export default Modal;
