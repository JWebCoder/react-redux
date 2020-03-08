import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

/**
 * Method responsible for the render of the TextArea component.
 */
const TextArea = ({
  fieldName,
  placeholder,
  onChange,
  value,
  requiredMessage,
  onKeyUp
}) => {
  return (
    <textarea
      className={styles.textArea}
      name={fieldName}
      onChange={e => onChange(e.target.value)}
      value={value}
      placeholder={placeholder}
      required={!!requiredMessage}
      onInvalid={e => e.target.setCustomValidity(requiredMessage)}
      onInput={e => e.target.setCustomValidity("")}
      onKeyUp={onKeyUp}
    />
  );
};

TextArea.propTypes = {
  /**
   * Callback to be called when the input changes
   */
  onChange: PropTypes.func.isRequired,
  /**
   * The fieldname uses to identify the field
   */
  fieldName: PropTypes.string.isRequired,
  /**
   *  Callback to be called on each key up
   */
  onKeyUp: PropTypes.func,
  /**
   * The input value
   */
  value: PropTypes.string,
  /**
   * THe input placeholder
   */
  placeholder: PropTypes.string,
  /**
   * Sets the required field on the input and indicates the error message
   */
  requiredMessage: PropTypes.string
};

TextArea.defaultProps = {
  onKeyUp: () => {},
  value: "",
  placeholder: null,
  requiredMessage: null
};

export default TextArea;
