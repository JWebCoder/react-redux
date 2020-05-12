import React, { useState } from "react";

import styles from "./styles.module.css";
import TextInput from "../TextInput";

const EditableSpan = ({ wrappingClass, value, onNewValue, allowEdit }) => {
  const [isEdditing, setEditting] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  const spanClick = () => {
    allowEdit && setEditting(true);
  };

  return (
    <React.Fragment>
      {isEdditing ? (
        <div className={wrappingClass + " " + styles.active}>
          <TextInput
            value={fieldValue}
            onChange={setFieldValue}
            onKeyUp={event => {
              if (event.keyCode !== 13) {
                return;
              }
              onNewValue(event.target.value);
              setEditting(false);
            }}
          />
        </div>
      ) : (
        <span
          onClick={spanClick}
          className={wrappingClass + " " + (allowEdit ? styles.editable : "")}
        >
          {fieldValue}
        </span>
      )}
    </React.Fragment>
  );
};

export default EditableSpan;
