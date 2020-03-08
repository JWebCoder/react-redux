import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

/**
 * One modal component
 */
const Modal = ({ children, onCloseClick, allowClose }) => {
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

Modal.propTypes = {
  /**
   * Modal children
   */
  children: PropTypes.any.isRequired,
  /**
   * Callback to be called when the close button is clicked
   */
  onCloseClick: PropTypes.func,
  /**
   * Indicates if the user is allowed to close the modal
   */
  allowClose: PropTypes.bool
};

Modal.defaultProps = {
  onCloseClick: () => {}
};

export default Modal;
