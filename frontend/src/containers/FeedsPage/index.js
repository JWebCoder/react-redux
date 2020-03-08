import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import CategoriesList from "../CategoriesList";
import PostsList from "../PostsList";
import AuthorModal from "../AuthorModal";
import NewPostModal from "../NewPostModal";
import styles from "./styles.module.css";

import { Button } from "../../components";
import { useTranslations } from "../useTranslations";
import { useModal } from "../useModal";
import { api } from "../../shared";

const FeedsPage = () => {
  const dispatch = useDispatch();
  const [, setPostsModal] = useModal("postsmodal");
  const [, setLanguage] = useTranslations();

  useEffect(() => {
    const handler = event => {
      if (event.key !== "lang") {
        return;
      }
      setLanguage(event.newValue);
    };

    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("storage", handler);
    };
  }, [setLanguage]);

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

  return (
    <React.Fragment>
      <Button
        floating
        className={styles.addButtonPosition}
        onClick={() => setPostsModal(true)}
      >
        <i className="fa fa-plus"></i>
      </Button>
      <AuthorModal onAuthor={onAuthor} />
      <NewPostModal onPost={onPost} />
      <div className={styles.container}>
        <div className={styles.categoriesContainer}>
          <CategoriesList />
        </div>
        <div className={styles.postsContainer}>
          <PostsList />
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeedsPage;
