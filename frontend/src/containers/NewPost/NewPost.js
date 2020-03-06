import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTranslations } from "../useTranslations";
import { TextInput, Button, TextArea, Modal, Select } from "../../components";
import { actionCreators as apiActionCreators } from "../../api";

import styles from "./styles.module.css";

const NewPostModal = ({ onCloseClick, visibility }) => {
  const [translations] = useTranslations("new_post_modal");

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
            placeholder={translations.title_placeholder}
            onChange={value => updateForm("title", value)}
            requiredMessage={translations.title_validation}
            value={formVal.title}
          />
        </div>
        <div className={styles.input}>
          <TextArea
            placeholder={translations.body_placeholder}
            onChange={value => updateForm("body", value)}
            requiredMessage={translations.title_validation}
            value={formVal.body}
          />
        </div>
        <div>
          <Select
            defaultTitle={translations.category_title}
            requiredMessage={translations.category_validation}
            onChange={e => updateForm("category", e.target.value)}
            selected={currentCategory}
            datasource={categories.map(category => ({
              value: category.path,
              text: category.name
            }))}
          />
        </div>
        <Button>{translations.submit}</Button>
      </form>
    </Modal>
  );
};

export default NewPostModal;
