import React, { useState } from "react";

import { Modal, TextInput, Button } from "../../components";
import { useTranslations } from "../useTranslations";
import styles from "./styles.module.css";

const AuthorModal = ({ onClose }) => {
  const [translations] = useTranslations("author_modal");
  const [inputAuthorVal, setInputAuthorVal] = useState("");

  const handleSubmit = () => {
    sessionStorage.setItem("author", inputAuthorVal);
    setInputAuthorVal("");
    onClose();
  };

  if (sessionStorage.author) {
    return null;
  }
  return (
    <Modal allowClose={false}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>{translations.title}</h3>
        <TextInput
          placeholder={translations.author_placeholder}
          onChange={setInputAuthorVal}
          requiredMessage={translations.author_validation}
        />
        <Button>{translations.submit}</Button>
      </form>
    </Modal>
  );
};

export default AuthorModal;
