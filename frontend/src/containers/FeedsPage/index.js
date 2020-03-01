import React from "react";

import { useDispatch } from "react-redux";

import { actionCreators as apiActionCreators } from "../../api";

import CategoriesList from "../CategoriesList";
import PostsList from "../PostsList";
import AuthorModal from "../AuthorModal";
import NewPost from "../NewPost";

const FeedsPage = () => {
  const dispatch = useDispatch();
  const onAuthor = () => dispatch(apiActionCreators.getPosts());

  return (
    <React.Fragment>
      <AuthorModal onClose={onAuthor} />
      <CategoriesList />
      <NewPost />
      <PostsList />
    </React.Fragment>
  );
};

export default FeedsPage;
