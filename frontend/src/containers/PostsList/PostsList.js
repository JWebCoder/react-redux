import React from "react";
import { useSelector } from "react-redux";

import Post from "./Post";
import styles from "./styles.module.css";

const PostsList = () => {
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
