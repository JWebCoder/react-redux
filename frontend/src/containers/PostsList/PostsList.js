import React from "react";
import { useSelector } from "react-redux";

import Post from "./Post";
import styles from "./styles.module.css";
import { useTranslations } from "../useTranslations";
const PostsList = () => {
  const [v, q] = useTranslations();
  console.log("VALUE PostsList", v);

  const posts = useSelector(state => state.apiReducer.posts);

  return (
    <div className={styles.container}>
      {posts.map(post => (
        <Post key={post.id} feed={post} />
      ))}
    </div>
  );
};

export default PostsList;
