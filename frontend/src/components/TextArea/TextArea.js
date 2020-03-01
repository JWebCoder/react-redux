import React from "react";

import styles from "./styles.module.css";

/**
 * Method responsible for the render of the TextInput component.
 */
const TextInput = ({
  fieldName,
  placeholder,
  onChange,
  value,
  invisible,
  disabled,
  requiredMessage,
  onKeyUp
}) => {
  return (
    <textarea
      className={styles.textArea}
      disabled={disabled}
      name={fieldName}
      onChange={e => onChange(e.target.value)}
      value={value}
      placeholder={placeholder}
      hidden={invisible}
      required={!!requiredMessage}
      onInvalid={e => e.target.setCustomValidity(requiredMessage)}
      onInput={e => e.target.setCustomValidity("")}
      onKeyUp={onKeyUp}
    />
  );
};

export default TextInput;
