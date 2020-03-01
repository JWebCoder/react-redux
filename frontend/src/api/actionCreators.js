import * as uuid from "uuid";

import {
  GET_CATEGORIES_LOADING,
  GET_CATEGORIES_SUCESS,
  GET_CATEGORIES_ERROR,
  GET_CATEGORY_POSTS_LOADING,
  GET_CATEGORY_POSTS_ERROR,
  GET_CATEGORY_POSTS_SUCCESS,
  GET_POSTS_LOADING,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  POST_POST_LOADING,
  POST_POST_SUCCESS,
  POST_POST_ERROR,
  GET_POST_LOADING,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  POST_POST_VOTE_LOADING,
  POST_POST_VOTE_SUCCESS,
  POST_POST_VOTE_ERROR,
  PUT_POST_DETAILS_LOADING,
  PUT_POST_DETAILS_SUCCESS,
  PUT_POST_DETAILS_ERROR,
  DELETE_POST_LOADING,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  GET_POST_COMMENTS_LOADING,
  GET_POST_COMMENTS_SUCCESS,
  GET_POST_COMMENTS_ERROR,
  GET_COMMENT_LOADING,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_ERROR,
  POST_COMMENT_VOTE_LOADING,
  POST_COMMENT_VOTE_SUCCESS,
  POST_COMMENT_VOTE_ERROR,
  PUT_COMMENT_DETAILS_LOADING,
  PUT_COMMENT_DETAILS_SUCCESS,
  PUT_COMMENT_DETAILS_ERROR,
  DELETE_COMMENT_LOADING,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR
} from "./actionTypes";

import request from "./request";

const FEEDS_BASE_URL =
  process.env.REACT_APP_API_PROTOCOL +
  "://" +
  process.env.REACT_APP_API_HOST +
  ":" +
  process.env.REACT_APP_API_PORT;

const CATEGORIES_RESOURCE_PATH = "/categories";
const POSTS_RESOURCE_PATH = "/posts";
const COMMENSTS_RESOURCE_PATH = "/comments";

const FULL_CATEGORIES_RESOURCE_PATH = FEEDS_BASE_URL + CATEGORIES_RESOURCE_PATH;
const FULL_POSTS_RESOURCE_PATH = FEEDS_BASE_URL + POSTS_RESOURCE_PATH;
const FULL_COMMENSTS_RESOURCE_PATH = FEEDS_BASE_URL + COMMENSTS_RESOURCE_PATH;

/**
 * Builds one action that represents something loading or not for a given type
 *
 * @param {string} type - The type that is or not loading
 * @param {bool} isLoading - Indicates if the type is loading or not
 */
const loading = (type, isLoading) => ({
  type,
  isLoading
});

/**
 * Builds one action that represents one type with error
 *
 * @param {string} type - The type that has error
 * @param {any} error - The error itself
 */
const error = (type, error) =>
  console.log(error) || {
    type,
    error
  };

/**
 * Builds one action that represents success for a given type
 *
 * @param {string} type - The type that was is successfull
 * @param {any} response - The data to be appended to the success of the type
 */
const sucess = (type, response) => ({
  type,
  response
});

/**
 * This function allows to generate tone api request lifecycle to a given type
 *
 * During the lifecycle of the request the loading, success and error actions will be dispatched
 * according to the state of the request
 *
 * @param {string} typeLoading - The type loading string
 * @param {string} typeSucess - The type success string
 * @param {string} typeError - The type error string
 * @param {string} path - The request path
 * @param {string} method - The request method
 * @param {object} params - The request params
 * @param {object} params.body - The body params
 */
const factory = (
  typeLoading,
  typeSucess,
  typeError,
  path,
  method,
  params
) => async dispatch => {
  try {
    dispatch(loading(typeLoading, true));
    const res = await request(path, method, params);

    dispatch(loading(typeLoading, false));
    if (res.status < 200 && res.status >= 300) {
      return dispatch(error(typeError, res.envelope));
    }
    dispatch(sucess(typeSucess, res.envelope));
  } catch (e) {
    dispatch(loading(typeLoading, false));
    dispatch(error(typeError, e));
  }
};

// -------------------
// CATEGORIES RESOURCE
// -------------------

/**
 * Get all the categories
 */
const getCategories = () =>
  factory(
    GET_CATEGORIES_LOADING,
    GET_CATEGORIES_SUCESS,
    GET_CATEGORIES_ERROR,
    FULL_CATEGORIES_RESOURCE_PATH,
    "GET"
  );

/**
 * Get the posts of a given categgory
 *
 * @param {string} - The category name
 */
const getCategoryPosts = name =>
  factory(
    GET_CATEGORY_POSTS_LOADING,
    GET_CATEGORY_POSTS_SUCCESS,
    GET_CATEGORY_POSTS_ERROR,
    FEEDS_BASE_URL + "/" + name + "/posts",
    "GET"
  );

// -------------------
// POSTS RESOURCE
// -------------------

/**
 * Get all the posts
 */
const getPosts = () =>
  factory(
    GET_POSTS_LOADING,
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    FULL_POSTS_RESOURCE_PATH,
    "GET"
  );

/**
 * Post one new post
 * @param {string} id - Post id
 * @param {string} title - Post title
 * @param {string} postBody - Post body
 * @param {string} author - Post author
 * @param {string} category - Post category
 */
const postPost = (title, body, author, category) => {
  const timestamp = Date.now();

  return factory(
    POST_POST_LOADING,
    POST_POST_SUCCESS,
    POST_POST_ERROR,
    FULL_POSTS_RESOURCE_PATH,
    "POST",
    {
      body: {
        id: uuid.v4(),
        title,
        body,
        author,
        category,
        timestamp
      }
    }
  );
};

/**
 * Get one post
 *
 * @param {string} id  - THe post to get
 */
const getPost = id =>
  factory(
    GET_POST_LOADING,
    GET_POST_SUCCESS,
    GET_POST_ERROR,
    FULL_POSTS_RESOURCE_PATH + "/" + id,
    "GET"
  );

/**
 * Vote on a post
 *
 * @param {string} id - The post to vote on
 * @param {bool} upvote -Indicates if it is upvote or downvote
 */
const postPostVote = (id, upvote) =>
  factory(
    POST_POST_VOTE_LOADING,
    POST_POST_VOTE_SUCCESS,
    POST_POST_VOTE_ERROR,
    FULL_POSTS_RESOURCE_PATH + "/" + id,
    "POST",
    { body: { option: upvote ? "upVote" : "downVote" } }
  );

/**
 * Puts details on a given post
 *
 * @param {string} id - The post to have new details
 * @param {string} title - The new post title
 * @param {string} body - The new post body
 */
const putPostDetails = (id, title, body) =>
  factory(
    PUT_POST_DETAILS_LOADING,
    PUT_POST_DETAILS_SUCCESS,
    PUT_POST_DETAILS_ERROR,
    FULL_POSTS_RESOURCE_PATH + "/" + id,
    "PUT",
    { body: { title, body } }
  );

/**
 * Delete a given post
 *
 * @param {string} id - The post to be deleted
 */
const deletePost = id =>
  factory(
    DELETE_POST_LOADING,
    DELETE_POST_SUCCESS,
    DELETE_POST_ERROR,
    FULL_POSTS_RESOURCE_PATH + "/" + id,
    "DELETE"
  );

/**
 * Gets a given post comments
 *
 * @param {string} id - The post that we are requesting comments from
 */
const getPostComments = id =>
  factory(
    GET_POST_COMMENTS_LOADING,
    GET_POST_COMMENTS_SUCCESS,
    GET_POST_COMMENTS_ERROR,
    FULL_POSTS_RESOURCE_PATH + "/" + id + CATEGORIES_RESOURCE_PATH,
    "GET"
  );

// COMMENTS RESOURCE
// -------------------

/**
 * Post one comment on a given post
 *
 * @param {string} postId - The post id of the post we are commenting.
 * @param {string} body - The comment body
 * @param {string} author - The comment author
 */
const postComment = (postId, body, author) =>
  factory(
    GET_POST_COMMENTS_LOADING,
    GET_POST_COMMENTS_SUCCESS,
    GET_POST_COMMENTS_ERROR,
    FULL_COMMENSTS_RESOURCE_PATH,
    "POST",
    { body: { timestamp: Date.now(), body, author, parentId: postId } }
  );

/**
 * Get a given comment
 *
 * @param {string} id - The comment we are requesting
 */
const getComment = id =>
  factory(
    GET_COMMENT_LOADING,
    GET_COMMENT_SUCCESS,
    GET_COMMENT_ERROR,
    FULL_COMMENSTS_RESOURCE_PATH + "/" + id,
    "GET"
  );

/**
 * Vote on a given comment
 *
 * @param {string} id - The comment we want to vote on
 * @param {bool} upvote - Indicates if the is one upvote or not
 */
const postCommentVote = (id, upvote) =>
  factory(
    POST_COMMENT_VOTE_LOADING,
    POST_COMMENT_VOTE_SUCCESS,
    POST_COMMENT_VOTE_ERROR,
    FULL_COMMENSTS_RESOURCE_PATH + "/" + id,
    "POST",
    { body: { option: upvote ? "upVote" : "downVote" } }
  );

/**
 * Put new details on a given comment
 *
 * @param {string} id - The comment that will have the new details
 * @param {string} body - The new comment body
 */
const putCommentDetails = (id, body) =>
  factory(
    PUT_COMMENT_DETAILS_LOADING,
    PUT_COMMENT_DETAILS_SUCCESS,
    PUT_COMMENT_DETAILS_ERROR,
    FULL_COMMENSTS_RESOURCE_PATH + "/" + id,
    "PUT",
    { body: { timestamp: Date.now(), body } }
  );

/**
 * Delete one comment
 *
 * @param {string} id - The comment we want to delete
 */
const deleteComment = id =>
  factory(
    DELETE_COMMENT_LOADING,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_ERROR,
    FULL_COMMENSTS_RESOURCE_PATH + "/" + id,
    "DELETE"
  );

export {
  //Categories
  getCategories,
  getCategoryPosts,
  //Posts
  getPosts,
  postPost,
  getPost,
  postPostVote,
  putPostDetails,
  deletePost,
  getPostComments,
  //Coments
  postComment,
  getComment,
  postCommentVote,
  putCommentDetails,
  deleteComment
};
