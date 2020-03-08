import React from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import LikePost from "./LikePost";
import styles from "./styles.module.css";

import { Editable } from "../../components";
import { api } from "../../shared";

/**
 * Component to build a given token
 */
const Post = ({ post }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.post}>
      <div className={styles.titleContainer}>
        <span className={styles.author + " " + styles.trimText}>
          {post.author}
        </span>
        &nbsp;
        <span className={styles.category + " " + styles.trimText}>
          {" " + post.category}
        </span>
        <Editable.EditableSpan
          allowEdit={post.author === sessionStorage.getItem("author")}
          value={post.title}
          wrappingClass={styles.title + " " + styles.trimText}
          onNewValue={value => {
            dispatch(
              api.actionCreators.putPostDetails(post.id, value, post.body)
            );
          }}
        />
        {post.author === sessionStorage.getItem("author") && (
          <span
            className={styles.delete}
            onClick={() => {
              dispatch(api.actionCreators.deletePost(post.id));
            }}
          >
            &times;
          </span>
        )}
      </div>
      <Editable.EditableP
        allowEdit={post.author === sessionStorage.getItem("author")}
        value={post.body}
        wrappingClass={styles.body}
        onNewValue={value => {
          dispatch(
            api.actionCreators.putPostDetails(post.id, post.title, value)
          );
        }}
      />
      <LikePost likes={post.voteScore} postId={post.id} />
    </div>
  );
};

Post.propTypes = {
  /**
   * The post to be used to build one psot card
   */
  post: PropTypes.object.isRequired
};

export default Post;
