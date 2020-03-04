import React from "react";
import { useSelector } from "react-redux";

import Post from "./Post";
import styles from "./styles.module.css";

import { List } from "../../components";

const PostsList = () => {
  const posts = useSelector(state => state.apiReducer.posts);

  const onRow = item => <Post key={item.id} feed={item} />;

  return (
    <div className={styles.container}>
      {posts.map(post => (
        <Post key={post.id} feed={post} />
      ))}
    </div>
  );
};

export default PostsList;
