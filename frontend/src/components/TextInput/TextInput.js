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
  disabled
}) => {
  return (
    <div className={styles.textinput}>
      <input
        disabled={disabled}
        name={fieldName}
        onChange={e => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        hidden={invisible}
      />
    </div>
  );
};

export default TextInput;
