import { useState, useEffect, useContext } from "react";

import * as context from "./context";

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

  return [strings[langVal][component], updateLanguageAndNotify];
}

export default useTranslations;
