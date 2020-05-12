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
  const currentCategory = useSelector(
    state => state.categoryListReducer.currentCategory
  );

  const categoryPosts = posts.filter(post => {
    if (!currentCategory) {
      return true;
    }

    return post.category === currentCategory;
  });

  if (!categoryPosts.length) {
    return <NoPosts />;
  }

  return categoryPosts.map(post => <Post key={post.id} post={post} />);
};

export default PostsList;
