import React, { useState } from "react";
import { Provider } from "./context";

import styles from "./styles.module.css";

const Form = ({ children, id, onSubmit }) => {
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
          updateFieldValue
        }}
      >
        {children}
      </Provider>
    </form>
  );
};

function shouldRerender() {
  return false;
}

const MemoizedForm = React.memo(Form, shouldRerender);

export default MemoizedForm;
