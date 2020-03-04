import React from "react";

import styles from "./styles.module.css";

const cssClass = (fullWidth, floating, cssPosition) => {
  const cssClasses = [styles.button];

  fullWidth && cssClasses.push(styles.fullWidth);
  floating && cssClasses.push(styles.floating);
  cssPosition && cssClasses.push(cssPosition);

  return cssClasses.join(" ");
};

const Button = ({
  children,
  onClick,
  floating,
  top,
  left,
  fullWidth,
  cssPosition
}) => (
  <button
    style={{ top, left }}
    className={cssClass(fullWidth, floating, cssPosition)}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
