import { CHOOSE_CATEGORY } from "./actionTypes";

const chooseCategory = (state, action) => ({
  ...state,
  currentCategory: action.category
});

const initialState = {
  currentCategory: null
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
    [CHOOSE_CATEGORY]: chooseCategory
  };

  return mapper[action.type] ? mapper[action.type](state, action) : state;
};

export default reducer;
