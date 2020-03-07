import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

/**
 * One select component
 */
const Select = ({
  datasource,
  selected,
  requiredMessage,
  defaultTitle,
  onChange
}) => (
  <select
    className={styles.select}
    onChange={e => onChange(e.target.value)}
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

Select.propTypes = {
  /**
   * Callback to be called when the option changes
   */
  onChange: PropTypes.func.isRequired,
  /**
   * The select options with two keys
   * - value
   * - text
   */
  datasource: PropTypes.array.isRequired,
  /**
   * The defalt option title
   */
  defaultTitle: PropTypes.string.isRequired,
  /**
   * Indicate the selected VALUE
   */
  selected: PropTypes.string,
  /**
   * Set required select and the requred message
   */
  requiredMessage: PropTypes.string
};

Select.defaultProps = {
  selected: null,
  requiredMessage: null
};

export default Select;
