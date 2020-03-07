import React from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { api } from "../../shared";
import { Button } from "../../components";

import styles from "./styles.module.css";

const LikePost = ({ postId, likes }) => {
  const dispatch = useDispatch();

  const vote = voteup => {
    dispatch(api.actionCreators.postPostVote(postId, voteup));
  };

  return (
    <div className={styles.likePostContainer}>
      <Button onClick={() => vote(true)} fullWidth>
        <i className="fa fa-thumbs-up"></i> {likes > 0 ? likes : null}
      </Button>
      <Button onClick={() => vote(false)} fullWidth>
        <i className="fa fa-thumbs-down"></i>{" "}
        {likes < 0 ? Math.abs(likes) : null}
      </Button>
    </div>
  );
};

LikePost.propTypes = {
  /**
   * The id of the post that will receive the component
   */
  postId: PropTypes.string.isRequired,
  /**
   * The post current likes counter value
   */
  likes: PropTypes.number.isRequired
};
export default LikePost;
