import { applyMiddleware, createStore, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

const reducers = combineReducers(() => {});

const middlewareEnhancer = applyMiddleware(thunkMiddleware);

const store = createStore(reducers, middlewareEnhancer);

export default store;
