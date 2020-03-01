import React from "react";
import { useDispatch } from "react-redux";

import { actionCreators as apiActionCreators } from "../../api";

import { Button } from "../../components";
import styles from "./styles.module.css";

const LikePost = ({ postId, likes }) => {
  const dispatch = useDispatch();

  const vote = voteup => {
    dispatch(apiActionCreators.postPostVote(postId, voteup));
  };

  return (
    <React.Fragment>
      <div className={styles.likePostContainer}>
        <Button onClick={() => vote(true)} fullWidth>
          <i className="fa fa-thumbs-up"></i> {likes > 0 ? likes : null}
        </Button>
        <Button onClick={() => vote(false)} fullWidth>
          <i className="fa fa-thumbs-down"></i>{" "}
          {likes < 0 ? Math.abs(likes) : null}
        </Button>
      </div>
    </React.Fragment>
  );
};

export default LikePost;
