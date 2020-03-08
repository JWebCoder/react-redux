import { useState, useEffect, useContext } from "react";

import * as context from "./context";

/**
 * Hook to use basic modal funcionalities
 *
 * @param {string} name - The modal name
 */
function useModal(name) {
  const contextObj = useContext(context.context);
  const [inputAuthorVal, setInputAuthorVal] = useState(false);

  if (!contextObj.subscribers[name]) {
    contextObj.subscribers[name] = [];
  }

  // Effect to subscribe to context so that we receive the modal updates
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

  // Exposed hook function to run the subscribers function on the current modal name
  const runSubsribers = visible => {
    contextObj.subscribers[name].forEach(sub => sub(visible));
  };

  return [inputAuthorVal, runSubsribers];
}

export default useModal;
