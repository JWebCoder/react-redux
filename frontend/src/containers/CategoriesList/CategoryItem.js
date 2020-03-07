import React from "react";

import { useSelector } from "react-redux";

import styles from "./styles.module.css";

const css = selected => {
  const cssClasses = [styles.item];

  selected && cssClasses.push(styles.selected);

  return cssClasses.join(" ");
};

const CategoryItem = ({ item, onClick }) => {
  const currentCategory = useSelector(
    state => state.categoryListReducer.currentCategory
  );
  return (
    <div className={css(item.name === currentCategory)} onClick={onClick}>
      <h2 className={styles.title + " " + styles.trim}>{item.name}</h2>
    </div>
  );
};

export default CategoryItem;
