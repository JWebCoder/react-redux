import { useState, useEffect, useContext } from "react";

import * as context from "./context";

/**
 * Hook that allows components to know the current language and have the strings of that language
 *
 * @param {string} component - One string to match to the top-level key in one on the strings file
 */
function useTranslations(component) {
  const contextObj = useContext(context.context);
  const strings = contextObj.strings;
  const [, setLang] = useState(contextObj.lang);

  // Subscribe for context changes
  useEffect(() => {
    const subscriptionId = contextObj.subscribers.length;
    contextObj.subscribers = [...contextObj.subscribers, setLang];

    return () => {
      contextObj.subscribers = contextObj.subscribers.filter(
        (v, i) => i !== subscriptionId
      );
    };
  }, [contextObj.subscribers]);

  // Hook exposed funcion to update the language. Will also notify other subscriptors
  const updateLanguageAndNotify = lang => {
    const allowedLangsKeys = Object.keys(strings);

    if (!allowedLangsKeys.includes(lang)) {
      return;
    }

    contextObj.lang = lang;
    contextObj.subscribers.forEach(sub => sub(lang));
  };

  return [
    {
      __lang: contextObj.lang,
      ...strings[contextObj.lang][component]
    },
    updateLanguageAndNotify
  ];
}

export default useTranslations;
