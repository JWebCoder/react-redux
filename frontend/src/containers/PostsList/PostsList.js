import React from "react";
import { useSelector } from "react-redux";

import Post from "./Post";

const PostsList = () => {
  const posts = useSelector(state => state.apiReducer.posts);

  return (
    <React.Fragment>
      {posts.map(post => (
        <Post key={post.id} feed={post} />
      ))}
    </React.Fragment>
  );
};

export default PostsList;
