import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoriesList from "../CategoriesList";
import PostsList from "../PostsList";
import AuthorModal from "../AuthorModal";
import NewPostModal from "../NewPostModal";
import styles from "./styles.module.css";

import { useModal } from "../useModal";
import { api } from "../../shared";

const FeedsPage = () => {
  const dispatch = useDispatch();
  const [, setPostsModal] = useModal("postsmodal");

  const posts = useSelector(state => state.apiReducer.posts);
  const onAuthor = () => dispatch(api.actionCreators.getPosts());

  const onPost = post =>
    dispatch(
      api.actionCreators.postPost(
        post.title,
        post.body,
        post.author,
        post.category
      )
    );

  useEffect(() => {
    dispatch(api.actionCreators.getPosts());
  }, [dispatch]);

  useEffect(() => {
    setPostsModal(!posts.length);
  }, [posts.length]);

  return (
    <React.Fragment>
      <AuthorModal onAuthor={onAuthor} />
      <NewPostModal onPost={onPost} />
      <div className={styles.container}>
        <div className={styles.categoriesContainer}>
          <CategoriesList onNewPost={() => setPostsModal(true)} />
        </div>
        <div className={styles.postsContainer}>
          <PostsList />
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeedsPage;
