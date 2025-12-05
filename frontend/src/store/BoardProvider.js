import React from "react";
import { TOOL_ITEMS } from "../constants";

import boardContext from "./board-context";

const BoardProvider = ({ children }) => {
  return (
    <boardContext.Provider
      value={{ activeToolItem: TOOL_ITEMS.LINE, elements: [] }}
    >
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
