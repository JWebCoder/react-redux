import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import categoryListReducer from "./containers/CategoriesList/reducer";
import { api } from "./shared";

const reducers = combineReducers({
  apiReducer: api.reducer,
  categoryListReducer
});

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default store;
