import React from "react";

const context = React.createContext({ listner: null });
const { Provider } = context;
export { Provider, context };
