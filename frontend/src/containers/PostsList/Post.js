import React from "react";
import { useSelector, useDispatch } from "react-redux";

import PostHeader from "./PostHeader";
import LikePost from "./LikePost";
import { Editable } from "../../components";
import styles from "./styles.module.css";
import { actionCreators as apiActionCreators } from "../../api";
const Feed = ({ feed }) => {
  const dispatch = useDispatch();
  const postComments = useSelector(state => state.apiReducer.commentsByPost);

  return (
    <div className={styles.post}>
      <PostHeader feed={feed} />
      <Editable.EditableP
        allowEdit={feed.author === sessionStorage.getItem("author")}
        value={feed.body}
        wrappingClass={styles.body}
        onNewValue={value => {
          dispatch(
            apiActionCreators.putPostDetails(feed.id, feed.title, value)
          );
        }}
      />
      <LikePost likes={feed.voteScore} postId={feed.id} />
      {feed.commentCount > 0 ? <p>CommentCount {feed.commentCount}</p> : null}
    </div>
  );
};

export default React.memo(Feed);
