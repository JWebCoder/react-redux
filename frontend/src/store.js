import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import categoryListReducer from "./containers/CategoriesList/reducer";
import { api } from "./shared";

const reducers = combineReducers({
  apiReducer: api.reducer,
  categoryListReducer
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
