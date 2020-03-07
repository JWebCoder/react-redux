import React from "react";
import { useSelector } from "react-redux";

import NoPosts from "./NoPosts";
import Post from "./Post";

const PostsList = () => {
  const posts = useSelector(state => state.apiReducer.posts);

  if (!posts.length) {
    return <NoPosts />;
  }
  return posts.map(post => <Post key={post.id} feed={post} />);
};

export default PostsList;
