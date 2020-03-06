import React from "react";
import ReactDOM from "react-dom";

import store from "./store";

import { Provider } from "react-redux";
import { FeedsPage } from "./containers";
import { pt, en } from "./shared";
import * as serviceWorker from "./serviceWorker";
import { context as TranslationsContext } from "./containers/useTranslations";

ReactDOM.render(
  <Provider store={store}>
    <TranslationsContext.Provider
      value={{ lang: "pt", strings: { pt, en }, subscribers: [] }}
    >
      <FeedsPage />
    </TranslationsContext.Provider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
