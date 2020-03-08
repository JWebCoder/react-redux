import React, { useState } from "react";
import Proptypes from "prop-types";

import { Provider } from "./context";

import styles from "./styles.module.css";

/**
 * Form component to encapsulate some basic form funcionalities
 */
const Form = ({ children, onSubmit }) => {
  const [formValues, setFormValues] = useState({});

  const updateFieldValue = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleOnSubmit} className={styles.form}>
      <Provider
        value={{
          updateFieldValue,
          values: formValues
        }}
      >
        {children}
      </Provider>
    </form>
  );
};

Form.propTypes = {
  /**
   * The form contet. Will has the form context
   */
  children: Proptypes.any.isRequired,
  /**
   * Callback to be called when the submit event was called under the form
   */
  onSubmit: Proptypes.func.isRequired
};

export default React.memo(Form);
