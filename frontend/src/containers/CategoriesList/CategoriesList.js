import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import CategoryItem from "../CategoriesList/CategoryItem";

import { api } from "../../shared";
import * as actionsCreators from "./actionsCreator";

/**
 * Component to build the several categories
 */
const CategoriesList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(api.actionCreators.getCategories());
  }, [dispatch]);

  const categories = useSelector(state => state.apiReducer.categories);

  return (
    <React.Fragment>
      {categories.map(item => (
        <CategoryItem
          key={item.name}
          item={item}
          onClick={() => {
            dispatch(actionsCreators.chooseCategory(item.name));
            dispatch(api.actionCreators.getCategoryPosts(item.name));
          }}
        />
      ))}
    </React.Fragment>
  );
};

export default CategoriesList;
