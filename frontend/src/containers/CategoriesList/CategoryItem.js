import React from "react";

import { H2 } from "../../components";

import styles from "./styles.module.css";

const css = selected => {
  const cssClasses = [styles.item];

  selected && cssClasses.push(styles.selected);

  return cssClasses.join(" ");
};

const CategoryItem = ({ item, selected, onClick }) => (
  <div className={css(selected)} onClick={onClick}>
    <H2 trim cssClass={styles.title}>
      {item.name}
    </H2>
  </div>
);

export default CategoryItem;
