import React, { useState } from "react";
import styles from "./styles.module.css";
import TextArea from "../TextArea";

const EditableP = ({ wrappingClass, value, onNewValue, allowEdit }) => {
  const [isEdditing, setEditting] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  const spanClick = () => {
    allowEdit && setEditting(true);
  };

  return (
    <React.Fragment>
      {isEdditing ? (
        <div className={wrappingClass}>
          <TextArea
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
        <p
          onClick={spanClick}
          className={wrappingClass + " " + (allowEdit ? styles.editable : "")}
        >
          {fieldValue}
        </p>
      )}
    </React.Fragment>
  );
};

export default EditableP;
