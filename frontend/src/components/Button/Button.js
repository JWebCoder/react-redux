import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

/**
 * Builds the classes for the component
 */
const cssClass = (fullWidth, floating, className) => {
  const cssClasses = [styles.button];

  fullWidth && cssClasses.push(styles.fullWidth);
  floating && cssClasses.push(styles.floating);
  className && cssClasses.push(className);

  return cssClasses.join(" ");
};

/**
 * One button component
 */
const Button = ({ children, onClick, floating, fullWidth, className }) => (
  <button
    className={cssClass(fullWidth, floating, className)}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  /**
   * Childrens to be rendered whithin Button
   */
  children: PropTypes.any.isRequired,
  /**
   * Callback to be called on button click
   */
  onClick: PropTypes.func,
  /**
   * Allow to append one custom lass to the button
   */
  className: PropTypes.string,
  /**
   * Indicates if the button should float. after you should inset one
   * custom cssclass
   */
  floating: PropTypes.bool,
  /**
   * Indicates if the button should have the parent width
   */
  fullWidth: PropTypes.bool
};

Button.defaultProps = {
  onClick: () => {},
  className: "",
  floating: false,
  fullWidth: false
};

export default Button;
