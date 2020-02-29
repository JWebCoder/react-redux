import React from "react";

import styles from "./styles.module.css";

const Modal = ({ children }) => (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <span className={styles.close}>&times;</span>
      {children}
    </div>
  </div>
);

export default Modal;
