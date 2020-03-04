import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoriesList from "../CategoriesList";
import PostsList from "../PostsList";
import AuthorModal from "../AuthorModal";
import NewPostModal from "../NewPost";

import { actionCreators as apiActionCreators } from "../../api";
import { Button } from "../../components";
import styles from "./styles.module.css";

const FeedsPage = () => {
  const [modalVisibility, setModalVIsibility] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.apiReducer.posts);
  const onAuthor = () => dispatch(apiActionCreators.getPosts());

  useEffect(() => {
    dispatch(apiActionCreators.getPosts());
  }, [dispatch]);

  useEffect(() => {
    setModalVIsibility(!posts.length);
  }, [posts.length]);

  return (
    <React.Fragment>
      <AuthorModal onClose={onAuthor} />
      <NewPostModal
        onCloseClick={() => setModalVIsibility(false)}
        visibility={modalVisibility}
      />
      <div className={styles.container}>
        <CategoriesList onNewPost={() => setModalVIsibility(true)} />
        <PostsList />
      </div>
    </React.Fragment>
  );
};

export default FeedsPage;
