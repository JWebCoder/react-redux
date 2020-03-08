import React from "react";
import { useSelector } from "react-redux";

import NoPosts from "./NoPosts";
import Post from "./Post";

/**
 * Component to build several posts
 *
 * Can also display the No Posts information if there are none
 */
const PostsList = () => {
  const posts = useSelector(state => state.apiReducer.posts);

  if (!posts.length) {
    return <NoPosts />;
  }
  return posts.map(post => <Post key={post.id} post={post} />);
};

export default PostsList;
