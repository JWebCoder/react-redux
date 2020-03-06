import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoriesList from "../CategoriesList";
import PostsList from "../PostsList";
import AuthorModal from "../AuthorModal";
import NewPostModal from "../NewPost";

import { api } from "../../shared";
import styles from "./styles.module.css";

const FeedsPage = () => {
  const [modalVisibility, setModalVIsibility] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.apiReducer.posts);
  const onAuthor = () => dispatch(api.actionCreators.getPosts());

  useEffect(() => {
    dispatch(api.actionCreators.getPosts());
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
