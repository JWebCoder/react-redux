import React from "react";

import styles from "./styles.module.css";

const cssClass = (onClick, verticalMargin, horizontalMargin) => {
  const cssClasses = [];

  onClick && cssClasses.push(styles.itemClickable);
  return cssClasses.join(" ");
};

const Item = ({ children, onClick }) => (
  <div role="button" onClick={onClick} className={cssClass(onClick)}>
    {children}
  </div>
);

export default Item;
