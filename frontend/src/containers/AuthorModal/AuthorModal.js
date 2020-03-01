import React, { useState } from "react";

import { Modal, TextInput, Button } from "../../components";

import styles from "./styles.module.css";
const AuthorModal = ({ onClose }) => {
  const [inputAuthorVal, setInputAuthorVal] = useState("");

  const handleSubmit = () => {
    sessionStorage.setItem("author", inputAuthorVal);
    setInputAuthorVal("");
    onClose();
  };

  if (sessionStorage.author) {
    onClose();
    return null;
  }
  return (
    <Modal allowClose={false}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>Autor</h3>
        <TextInput
          placeholder="Author"
          onChange={setInputAuthorVal}
          requiredMessage="O seu nome "
        />
        <Button>Aceitar </Button>
      </form>
    </Modal>
  );
};

export default AuthorModal;
