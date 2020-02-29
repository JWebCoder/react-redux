import React from "react";

import CategoriesList from "../CategoriesList";
import AuthorModal from "../AuthorModal";

const FeedsPage = () => (
  <React.Fragment>
    <AuthorModal />
    <CategoriesList />
  </React.Fragment>
);

export default FeedsPage;
