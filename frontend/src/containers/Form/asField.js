import React, { useContext } from "react";
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

  return (
    <WrappedField
      onChange={updateFieldValue}
      value={contextValue.values[props.fieldName]}
      {...props}
    />
  );
};

export default asField;
