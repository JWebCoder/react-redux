import { useState, useEffect, useContext } from "react";

import * as context from "./context";

/**
 * Hook that allows components to know the current language and have the strings of that language
 *
 * @param {string} component - One string hat matched to the top-level one on the strings file
 */
function useTranslations(component) {
  const contextObj = useContext(context.context);
  const strings = contextObj.strings;

  const [langVal, setLang] = useState(contextObj.lang);

  useEffect(() => {
    const subscriptionId = contextObj.subscribers.length;
    contextObj.subscribers = [...contextObj.subscribers, setLang];

    return () => {
      contextObj.subscribers = contextObj.subscribers.filter(
        (v, i) => i !== subscriptionId
      );
    };
  }, []);

  const updateLanguageAndNotify = lang => {
    contextObj.lang = lang;
    contextObj.subscribers.forEach(sub => sub(lang));
  };

  return [
    {
      ...strings[langVal][component],
      __lang: contextObj.lang
    },
    updateLanguageAndNotify
  ];
}

export default useTranslations;
