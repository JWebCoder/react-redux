import React from "react";
import { useDispatch } from "react-redux";

import LikePost from "./LikePost";
import styles from "./styles.module.css";

import { Editable } from "../../components";
import { api } from "../../shared";

const Feed = ({ feed }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.post}>
      <div className={styles.titleContainer}>
        <span className={styles.author + " " + styles.trimText}>
          {feed.author}
        </span>
        &nbsp;
        <span className={styles.category + " " + styles.trimText}>
          {" " + feed.category}
        </span>
        <Editable.EditableSpan
          allowEdit={feed.author === sessionStorage.getItem("author")}
          value={feed.title}
          wrappingClass={styles.title + " " + styles.trimText}
          onNewValue={value => {
            dispatch(
              api.actionCreators.putPostDetails(feed.id, value, feed.body)
            );
          }}
        />
        {feed.author === sessionStorage.getItem("author") && (
          <span
            className={styles.delete}
            onClick={() => {
              dispatch(api.actionCreators.deletePost(feed.id));
            }}
          >
            &times;
          </span>
        )}
      </div>
      <Editable.EditableP
        allowEdit={feed.author === sessionStorage.getItem("author")}
        value={feed.body}
        wrappingClass={styles.body}
        onNewValue={value => {
          dispatch(
            api.actionCreators.putPostDetails(feed.id, feed.title, value)
          );
        }}
      />
      <LikePost likes={feed.voteScore} postId={feed.id} />
    </div>
  );
};

export default React.memo(Feed);
