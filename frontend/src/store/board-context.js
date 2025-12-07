import { createContext } from "react";

const boardContext = createContext({
  activeToolItem: "",
  elements: [],
  toolActionType: "",
  handleToolItemClick: () => {},
  boardMouseDownHandler: () => {},
  boardMouseMoveHandler: () => {},
  changeToolHandler: () => {},
  boardMouseUpHandler: () => {},
});

export default boardContext;
