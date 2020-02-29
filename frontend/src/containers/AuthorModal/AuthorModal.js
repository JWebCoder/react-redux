import React from "react";

import { Modal, TextInput } from "../../components";

const AuthorModal = () => {
  if (sessionStorage.author) {
    return null;
  }
  return (
    <Modal>
      <div>
        <p>Autor</p>
      </div>
      <div>
        <TextInput
          placeholder="Author"
          onChange={value => sessionStorage.setItem("author", value)}
        />
      </div>
    </Modal>
  );
};

export default AuthorModal;
