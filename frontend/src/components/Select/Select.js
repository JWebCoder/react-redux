import React from "react";

import styles from "./styles.module.css";

const Select = ({
  datasource,
  selected,
  requiredMessage,
  defaultTitle,
  onChange
}) => (
  <select
    className={styles.select}
    onChange={onChange}
    id="country"
    name="country"
    value={selected}
    required={!!requiredMessage}
    onInvalid={e => e.target.setCustomValidity(requiredMessage)}
    onInput={e => e.target.setCustomValidity("")}
  >
    <option value="">{defaultTitle}</option>
    {datasource.map(option => (
      <option key={option.value} value={option.value}>
        {option.text}
      </option>
    ))}
  </select>
);

export default Select;
