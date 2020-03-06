import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoryItem from "../CategoriesList/CategoryItem";
import styles from "./styles.module.css";

import { actionCreators as apiActionCreators } from "../../api";
import { Button } from "../../components";

import * as actionsCreators from "./actionsCreator";

const CategoriesList = ({ onNewPost }) => {
  const dispatch = useDispatch();
  const currentCategory = useSelector(
    state => state.categoryListReducer.currentCategory
  );

  useEffect(() => {
    dispatch(apiActionCreators.getCategories());
  }, [dispatch]);

  const categories = useSelector(state => state.apiReducer.categories);

  return (
    <div className={styles.verticalList}>
      <Button
        floating
        cssPosition={styles.addButtonPosition}
        onClick={onNewPost}
      >
        <i className="fa fa-plus my-float"></i>
      </Button>
      {categories.map(item => (
        <CategoryItem
          key={item.name}
          item={item}
          selected={item.name === currentCategory}
          onClick={() => {
            dispatch(actionsCreators.chooseCategory(item.name));
            dispatch(apiActionCreators.getCategoryPosts(item.name));
          }}
        />
      ))}
    </div>
  );
};

export default CategoriesList;
