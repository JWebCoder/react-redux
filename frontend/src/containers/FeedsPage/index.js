import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../api";

const FeedsPage = () => {
  const dispatch = useDispatch();
  dispatch(actionCreators.getCategories());
  dispatch(actionCreators.getCategoryPosts("react"));
  return <p>Olá</p>;
};

export default FeedsPage;
