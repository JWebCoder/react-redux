import { TOGGLE_POST_COMMENTS } from "./actionTypes";

const togglePostComments = id => ({
  type: TOGGLE_POST_COMMENTS,
  id
});

export { togglePostComments };
