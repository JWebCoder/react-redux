import React from "react";

import styles from "./styles.module.css";

const Modal = ({ children, allowClose }) => (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      {allowClose && <span className={styles.close}>&times;</span>}
      {children}
    </div>
  </div>
);

export default Modal;
