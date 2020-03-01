import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./styles.module.css";
import { Editable } from "../../components";

import { actionCreators as apiActionCreators } from "../../api";

const PostHeader = ({ feed }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.titleContainer}>
      <span className={styles.author}>{feed.author}</span>
      &nbsp;
      <span> publicou em </span>
      &nbsp;
      <span className={styles.category}>{" " + feed.category}</span>
      <Editable.EditableSpan
        allowEdit={feed.author === sessionStorage.getItem("author")}
        value={feed.title}
        wrappingClass={styles.title}
        onNewValue={value => {
          dispatch(apiActionCreators.putPostDetails(feed.id, value, feed.body));
        }}
      />
      {feed.author === sessionStorage.getItem("author") && (
        <span
          className={styles.delete}
          onClick={() => {
            dispatch(apiActionCreators.deletePost(feed.id));
          }}
        >
          &times;
        </span>
      )}
    </div>
  );
};

export default PostHeader;
