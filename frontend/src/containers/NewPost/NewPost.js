import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TextInput, Button, TextArea, Modal, Select } from "../../components";
import { actionCreators as apiActionCreators } from "../../api";

import styles from "./styles.module.css";

const NewPostModal = ({ onCloseClick, visibility }) => {
  const initialValues = { title: "", body: "" };

  const dispatch = useDispatch();
  const [formVal, setFormVal] = useState(initialValues);

  const currentCategory = useSelector(
    state => state.categoryListReducer.currentCategory
  );

  const categories = useSelector(state => state.apiReducer.categories);

  if (!visibility) {
    return null;
  }

  const updateForm = (key, value) => {
    setFormVal({
      ...formVal,
      [key]: value
    });
  };

  const onFormSubmit = event => {
    event.preventDefault();
    setFormVal(initialValues);
    return dispatch(
      apiActionCreators.postPost(
        formVal.title,
        formVal.body,
        sessionStorage.getItem("author"),
        formVal.category || currentCategory
      )
    );
  };

  return (
    <Modal allowClose={true} onCloseClick={onCloseClick}>
      <form className={styles.form} onSubmit={onFormSubmit}>
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
        <div>
          <Select
            defaultTitle="Escolha uma categoria"
            requiredMessage={"È necessário escolher uma categoria"}
            onChange={e => updateForm("category", e.target.value)}
            selected={currentCategory}
            datasource={categories.map(category => ({
              value: category.path,
              text: category.name
            }))}
          />
        </div>
        <Button>Novo Post</Button>
      </form>
    </Modal>
  );
};

export default NewPostModal;
