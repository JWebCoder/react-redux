import React, { useContext, useEffect } from "react";
import { context } from "./context";

/**
 * This HOC wraps a given component to connect it to the forms main component
 *
 * Will catch the change events
 */
const asField = WrappedField => props => {
  const contextValue = useContext(context);

  const updateFieldValue = value => {
    contextValue.updateFieldValue(props.fieldName, value);
  };

  // Initialize the field on the context so that we can have default values
  // passed via props
  useEffect(() => {
    let value = "";
    // Used for the select box
    if (props.selected) {
      value = props.selected;
    }

    if (props.value) {
      value = props.value;
    }

    updateFieldValue(value);
    // eslint-disable-next-line
  }, []);

  return (
    <WrappedField
      {...props}
      selected={contextValue.values[props.fieldName]}
      onChange={updateFieldValue}
      value={contextValue.values[props.fieldName]}
    />
  );
};

export default asField;
