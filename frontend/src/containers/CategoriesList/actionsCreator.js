import { CHOOSE_CATEGORY } from "./actionTypes";

/**
 * Builds one action that represents something loading or not for a given type
 *
 * @param {string} type - The type that is or not loading
 * @param {bool} isLoading - Indicates if the type is loading or not
 */
const chooseCategory = category => ({
  type: CHOOSE_CATEGORY,
  category
});

export { chooseCategory };
