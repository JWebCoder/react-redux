import React from "react";

import styles from "./styles.module.css";

const Modal = ({ children, onCloseClick, allowClose }) => (
  <div className={styles.modal}>
    <div className={styles.content}>
      {allowClose && (
        <span onClick={onCloseClick} className={styles.close}>
          &times;
        </span>
      )}
      {children}
    </div>
  </div>
);

export default Modal;
