import React from "react";
import PropTypes from "prop-types";

import { Modal, Button } from "../../components";
import { useTranslations } from "../useTranslations";
import { Form } from "../Form";
import { FormFields } from "..";

/**
 * Modal to allow user to enter the session author name
 */
const AuthorModal = ({ onAuthor }) => {
  const [translations] = useTranslations("author_modal");

  const handleSubmit = values => {
    sessionStorage.setItem("author", values);
    onAuthor();
  };

  if (sessionStorage.author) {
    return null;
  }
  return (
    <Modal allowClose={false}>
      <Form id="author" onSubmit={handleSubmit}>
        <h3>{translations.title}</h3>
        <FormFields.TextInput
          placeholder={translations.author_placeholder}
          requiredMessage={translations.author_validation}
          fieldname="authorname"
        />
        <Button>{translations.submit}</Button>
      </Form>
    </Modal>
  );
};

AuthorModal.propTypes = {
  /**
   * Callback function to be called when the modal action is to close
   */
  onAuthor: PropTypes.func.isRequired
};

export default AuthorModal;
