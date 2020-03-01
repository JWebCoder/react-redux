import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as apiActionCreators } from "../../api";
import { List } from "../../components";

import Post from "./Post";
import styles from "./styles.module.css";

const PostsList = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector(
    state => state.categoryListReducer.currentCategory
  );
  const postsByCategory = useSelector(
    state => state.apiReducer.postsByCategory
  );
  const posts = useSelector(state => state.apiReducer.posts);

  useEffect(() => {
    dispatch(apiActionCreators.getCategories());
  }, []);

  const onRow = item => <Post key={item.id} feed={item} />;

  const datasource = () => {
    if (
      !postsByCategory[currentCategory] ||
      postsByCategory[currentCategory].length === 0
    ) {
      return posts;
    }
    return postsByCategory[currentCategory];
  };

  return (
    <div className={styles.list}>
      <List
        datasource={datasource()}
        onRow={onRow}
        onBottomScroll={() => {}}
      ></List>
    </div>
  );
};

export default PostsList;
