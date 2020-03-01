import React from "react";

import styles from "./styles.module.css";

const css = selected => {
  const cssClasses = [styles.item];

  selected && cssClasses.push(styles.selected);

  return cssClasses.join(" ");
};

const CategoryItem = ({ item, selected, onClick }) => (
  <div className={css(selected)} onClick={onClick}>
    <h2 className={styles.title}>{item.name}</h2>
  </div>
);

export default CategoryItem;
