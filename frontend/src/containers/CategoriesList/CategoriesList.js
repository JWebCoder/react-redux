import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as apiActionCreators } from "../../api";
import { List } from "../../components";

import * as actionsCreators from "./actionsCreator";
import CategoryItem from "../CategoriesList/CategoryItem";
import styles from "./styles.module.css";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector(
    state => state.categoryListReducer.currentCategory
  );
  useEffect(() => {
    dispatch(apiActionCreators.getCategories());
  }, []);

  const categories = useSelector(state => state.apiReducer.categories);

  const onRow = item => (
    <CategoryItem
      key={item.name}
      item={item}
      selected={item.name === currentCategory}
      onClick={() => {
        dispatch(actionsCreators.chooseCategory(item.name));
        dispatch(apiActionCreators.getCategoryPosts(item.name));
      }}
    />
  );

  return (
    <div className={styles.container}>
      <List
        horizontal
        datasource={categories}
        onRow={onRow}
        onBottomScroll={() => {}}
      ></List>
    </div>
  );
};

export default CategoriesList;
