import * as constants from "./constants";

const setDefault = defaultLang => {
  if (!localStorage.getItem(constants.LANG_KEY)) {
    localStorage.setItem(constants.LANG_KEY, defaultLang);
  }
};

export default setDefault;
