import React from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import styles from "./styles.module.css";

/**
 * Builds the component css classes string
 */
const css = selected => {
  const cssClasses = [styles.item];

  selected && cssClasses.push(styles.selected);

  return cssClasses.join(" ");
};

/**
 * Display one category and allow to select if
 */
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

CategoryItem.propTypes = {
  /**
   * Callback to be callend on the category item click
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Category item
   */
  item: PropTypes.object.isRequired
};

export default CategoryItem;
