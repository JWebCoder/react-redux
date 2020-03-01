import React from "react";

import styles from "./styles.module.css";

const cssClass = fullWidth => {
  const cssClasses = [styles.button];

  fullWidth && cssClasses.push(styles.fullWidth);
  return cssClasses.join(" ");
};

const Button = ({ children, onClick, fullWidth }) => (
  <button className={cssClass(fullWidth)} onClick={onClick}>
    {children}
  </button>
);

export default Button;
