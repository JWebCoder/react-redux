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

/**
 * Builds the new state with the error ppended for the action type
 *
 * @param {object} state - Current state.
 * @param {object} action - The action that is being dispatched.
 * @param {string} action.type - The fired action type.
 * @param {any} action.error - The actual error to be appended to the action type on the state
 */
const error = (state, action) => ({
  ...state,
  [action.type]: action.error
});

/**
 * Builds the new state indicating the loading state for the given action type
 *
 * @param {object} state - Current state.
 * @param {object} action - The action that is being dispatched that will set loading the the type.
 * @param {string} action.type - The fired action type.
 * @param {boolean} action.isLoading - Indicates if the state should be loading or not.
 */
const loading = (state, action) => ({
  ...state,
  [action.type]: action.isLoading
});

/**
 * Builds the new state with new categories appended to it
 *
 * @param {object} state - Current state.
 * @param {object} action - The action that was dispatched
 * @param {object} action.response - One object that contains the new categores
 * @param {object} action.response.categories - The new categories to be appended to the state
 */
const saveCategories = (state, action) => ({
  ...state,
  categories: action.response.categories
});

/**
 * Builds the new state with new categories posts
 *
 * @param {object} state - Current state.
 * @param {object} action - The action that was dispatched
 * @param {object} action.response - One object that contains the new categores posts
 */
const saveCategoryPosts = (state, action) => ({
  ...state,
  postsByCategory: action.response.reduce((acc, val) => {
    return {
      ...acc,
      [val.category]: [...(acc[val.category] ? acc[val.category] : []), val]
    };
  }, {})
});

const getPosts = (state, action) => ({
  ...state,
  posts: action.response
});

const getPostComments = (state, action) => ({
  ...state,
  posts: action.response
});

const deletePost = (state, action) => ({
  ...state,
  postsByCategory: Object.keys(state.postsByCategory).reduce(
    (acc, key) => ({
      ...acc,
      [key]: state.postsByCategory[key].filter(
        post => post.id !== action.response.id
      )
    }),
    {}
  ),
  posts: state.posts.filter(post => post.id !== action.response.id)
});

const postPost = (state, action) => ({
  ...state,
  posts: [...state.posts, action.response],
  postsByCategory: {
    ...state.postsByCategory,
    [action.response.category]: [
      ...(state.postsByCategory[action.response.category]
        ? state.postsByCategory[action.response.category]
        : []),
      action.response
    ]
  }
});

const postVote = (state, action) => ({
  ...state,
  posts: state.posts.map(post => {
    if (post.id !== action.response.id) {
      return post;
    }
    return action.response;
  }),
  postsByCategory: {
    ...state.postsByCategory,
    [action.response.category]:
      state.postsByCategory[action.response.category] &&
      state.postsByCategory[action.response.category].map(post => {
        if (post.id !== action.response.id) {
          return post;
        }
        return action.response;
      })
  }
});

const savePostDetails = (state, action) =>
  console.log(action.response) || {
    ...state,
    posts: state.posts.map(post => {
      if (post.id !== action.response.id) {
        return post;
      }
      return action.response;
    }),
    postsByCategory: {
      ...state.postsByCategory,
      [action.response.category]:
        state.postsByCategory[action.response.category] &&
        state.postsByCategory[action.response.category].map(post => {
          if (post.id !== action.response.id) {
            return post;
          }
          return action.response;
        })
    }
  };

const initialState = {
  categories: [],
  postsByCategory: {},
  posts: []
};

/**
 * The reducer that handles all the api actions.
 *
 * @param {object} state - The current state.
 * @param {object} action - The action to be dispatched comming from actionCreators.
 *
 * @returns {object} Returns state tree for the dispatched action.
 */
const reducer = (state = initialState, action) => {
  const mapper = {
    [GET_CATEGORIES_LOADING]: loading,
    [GET_CATEGORIES_SUCESS]: saveCategories,
    [GET_CATEGORIES_ERROR]: error,

    [GET_CATEGORY_POSTS_LOADING]: loading,
    [GET_CATEGORY_POSTS_SUCCESS]: saveCategoryPosts,
    [GET_CATEGORY_POSTS_ERROR]: error,

    [GET_POSTS_LOADING]: loading,
    [GET_POSTS_SUCCESS]: getPosts,
    [GET_POSTS_ERROR]: error,

    [POST_POST_LOADING]: loading,
    [POST_POST_SUCCESS]: postPost,
    [POST_POST_ERROR]: error,

    [GET_POST_LOADING]: loading,
    [GET_POST_SUCCESS]: saveCategoryPosts,
    [GET_POST_ERROR]: error,

    [POST_POST_VOTE_LOADING]: loading,
    [POST_POST_VOTE_SUCCESS]: postVote,
    [POST_POST_VOTE_ERROR]: error,

    [PUT_POST_DETAILS_LOADING]: loading,
    [PUT_POST_DETAILS_SUCCESS]: savePostDetails,
    [PUT_POST_DETAILS_ERROR]: error,

    [DELETE_POST_LOADING]: loading,
    [DELETE_POST_SUCCESS]: deletePost,
    [DELETE_POST_ERROR]: error,

    [GET_POST_COMMENTS_LOADING]: loading,
    [GET_POST_COMMENTS_SUCCESS]: getPostComments,
    [GET_POST_COMMENTS_ERROR]: error,

    [GET_COMMENT_LOADING]: loading,
    [GET_COMMENT_SUCCESS]: saveCategoryPosts,
    [GET_COMMENT_ERROR]: error,

    [POST_COMMENT_VOTE_LOADING]: loading,
    [POST_COMMENT_VOTE_SUCCESS]: saveCategoryPosts,
    [POST_COMMENT_VOTE_ERROR]: error,

    [PUT_COMMENT_DETAILS_LOADING]: loading,
    [PUT_COMMENT_DETAILS_SUCCESS]: saveCategoryPosts,
    [PUT_COMMENT_DETAILS_ERROR]: error,

    [DELETE_COMMENT_LOADING]: loading,
    [DELETE_COMMENT_SUCCESS]: saveCategoryPosts,
    [DELETE_COMMENT_ERROR]: error
  };

  return mapper[action.type] ? mapper[action.type](state, action) : state;
};

export default reducer;
