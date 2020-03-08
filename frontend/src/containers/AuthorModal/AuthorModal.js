import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { Modal, Button } from "../../components";
import { useTranslations } from "../useTranslations";
import { useModal } from "../useModal";
import { Form } from "../Form";
import { FormFields } from "..";

/**
 * Modal to allow user to enter the session author name
 */
const AuthorModal = ({ onAuthor }) => {
  const [authorModal, setAuthorModal] = useModal("author_modal");
  const [translations] = useTranslations("author_modal");

  useEffect(() => {
    setAuthorModal(!sessionStorage.author);
  }, [setAuthorModal]);

  const handleSubmit = values => {
    sessionStorage.setItem("author", values.name);
    onAuthor();
    setAuthorModal(false);
  };

  if (!authorModal) {
    return null;
  }

  return (
    <Modal allowClose={false}>
      <Form onSubmit={handleSubmit}>
        <h3>{translations.title}</h3>
        <FormFields.TextInput
          placeholder={translations.author_placeholder}
          requiredMessage={translations.author_validation}
          fieldName="name"
          þ
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
