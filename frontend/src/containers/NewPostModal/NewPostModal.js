import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { useTranslations } from "../useTranslations";
import { useModal } from "../useModal";
import { Button, Modal } from "../../components";
import { Form } from "../Form";
import { FormFields } from "..";

/**
 * Modal to present one form for one new post
 */
const NewPostModal = ({ onPost }) => {
  const [postsModal, setPostsModal] = useModal("postsmodal");
  const [translations] = useTranslations("new_post_modal");

  const currentCategory = useSelector(
    state => state.categoryListReducer.currentCategory
  );

  const categories = useSelector(state => state.apiReducer.categories);

  const onFormSubmit = values => {
    setPostsModal(false);
    onPost({
      title: values.title,
      body: values.body,
      author: sessionStorage.getItem("author"),
      category: values.category || currentCategory
    });
  };

  if (!postsModal) {
    return null;
  }
  return (
    <Modal allowClose={true} onCloseClick={() => setPostsModal(false)}>
      <Form onSubmit={onFormSubmit}>
        <FormFields.TextInput
          placeholder={translations.title_placeholder}
          requiredMessage={translations.title_validation}
          fieldName={"title"}
        />

        <FormFields.TextArea
          placeholder={translations.body_placeholder}
          requiredMessage={translations.title_validation}
          fieldName={"body"}
        />

        <FormFields.Select
          defaultTitle={translations.category_title}
          requiredMessage={translations.category_validation}
          selected={currentCategory}
          datasource={categories.map(category => ({
            value: category.path,
            text: category.name
          }))}
          fieldName={"category"}
        />

        <Button>{translations.submit}</Button>
      </Form>
    </Modal>
  );
};

NewPostModal.propTypes = {
  /**
   * Function to be called when one new form is submitted
   */
  onPost: PropTypes.func.isRequired
};
export default NewPostModal;
