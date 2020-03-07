import { useState, useEffect, useContext } from "react";

import * as context from "./context";

function useModal(name) {
  const contextObj = useContext(context.context);

  const [inputAuthorVal, setInputAuthorVal] = useState(false);

  if (!contextObj.subscribers[name]) {
    contextObj.subscribers[name] = [];
  }

  useEffect(() => {
    const subscriptionId = contextObj.subscribers[name].length;
    contextObj.subscribers[name] = [
      ...contextObj.subscribers[name],
      setInputAuthorVal
    ];

    return () => {
      contextObj.subscribers[name] = contextObj.subscribers[name].filter(
        (v, i) => i !== subscriptionId
      );
    };
  }, [contextObj.subscribers, name]);

  const runSubsribers = visible => {
    contextObj.subscribers[name].forEach(sub => sub(visible));
  };

  return [inputAuthorVal, runSubsribers];
}

export default useModal;
