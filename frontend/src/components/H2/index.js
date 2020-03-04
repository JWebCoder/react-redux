import React from "react";

import styles from "./styles.module.css";

const buildCss = (cssClass, trim) => {
  const cssClasses = [cssClass];

  trim && cssClasses.push(styles.trim);

  return cssClasses.join(" ");
};

const H2 = ({ children, cssClass, trim }) => (
  <h2 className={buildCss(cssClass, trim)}>{children}</h2>
);

export default H2;
