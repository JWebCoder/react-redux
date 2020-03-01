import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";

import { TextInput, Button, TextArea } from "../../components";
import { actionCreators as apiActionCreators } from "../../api";

const NewPost = () => {
  const initialValues = { title: "", body: "" };

  const dispatch = useDispatch();
  const [formVal, setFormVal] = useState(initialValues);

  const currentCategory = useSelector(
    state => state.categoryListReducer.currentCategory
  );

  if (!currentCategory) {
    return null;
  }

  const updateForm = (key, value) => {
    setFormVal({
      ...formVal,
      [key]: value
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={event => {
        event.preventDefault();
        setFormVal(initialValues);
        return dispatch(
          apiActionCreators.postPost(
            formVal.title,
            formVal.body,
            sessionStorage.getItem("author"),
            currentCategory
          )
        );
      }}
    >
      <div className={styles.input}>
        <TextInput
          placeholder="Titúlo"
          onChange={value => updateForm("title", value)}
          requiredMessage="O post precisa de um titúlo"
          value={formVal.title}
        />
      </div>
      <div className={styles.input}>
        <TextArea
          placeholder="Corpo"
          onChange={value => updateForm("body", value)}
          requiredMessage="O post precisa de um corpo"
          value={formVal.body}
        />
      </div>
      <Button>Criar</Button>
    </form>
  );
};

export default NewPost;
