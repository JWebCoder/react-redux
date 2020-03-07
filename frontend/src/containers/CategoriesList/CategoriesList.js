import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoryItem from "../CategoriesList/CategoryItem";
import styles from "./styles.module.css";

import { api } from "../../shared";
import { Button } from "../../components";
import * as actionsCreators from "./actionsCreator";

const CategoriesList = ({ onNewPost }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(api.actionCreators.getCategories());
  }, [dispatch]);

  const categories = useSelector(state => state.apiReducer.categories);

  return (
    <React.Fragment>
      <Button floating className={styles.addButtonPosition} onClick={onNewPost}>
        <i className="fa fa-plus my-float"></i>
      </Button>
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
