import React, { useReducer } from "react";
import { BOARD_ACTIONS, TOOL_ACTION_TYPES, TOOL_ITEMS } from "../constants";
import boardContext from "./board-context";
import { createRoughElement } from "../utils/element";

const boardReducer = (state, action) => {
  switch (action.type) {
    case BOARD_ACTIONS.CHANGE_TOOL:
      return {
        ...state,
        activeToolItem: action.payload.tool,
      };

    case BOARD_ACTIONS.DRAW_DOWN: {
      const { clientX, clientY } = action.payload;
      const newElement = createRoughElement(
        state.elements.length,
        clientX,
        clientY,
        clientX,
        clientY,
        { type: state.activeToolItem }
      );

      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.DRAWING,
        elements: [...state.elements, newElement],
      };
    }

    case BOARD_ACTIONS.DRAW_MOVE: {
      const { clientX, clientY } = action.payload;

      const newElements = [...state.elements];
      const index = state.elements.length - 1;
      const { x1, y1 } = newElements[index];
      // newElements[index] = {
      //   ...newElements[index],
      //   x2: moveX,
      //   y2: moveY,
      //   roughEle: gen.line(
      //     newElements[index].x1,
      //     newElements[index].y1,
      //     moveX,
      //     moveY
      //   ),
      // };
      const newElement = createRoughElement(index, x1, y1, clientX, clientY, {
        type: state.activeToolItem,
      });
      newElements[index] = newElement;
      return {
        ...state,
        elements: newElements,
      };
    }

    case BOARD_ACTIONS.DRAW_UP: {
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.NONE,
      };
    }

    default:
      return state;
  }
};

const initialBoardState = {
  activeToolItem: TOOL_ITEMS.LINE,
  toolActionType: TOOL_ACTION_TYPES.NONE,
  elements: [],
};

const BoardProvider = ({ children }) => {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState
  );

  const changeToolHandler = (tool) => {
    dispatchBoardAction({
      type: "CHANGE_TOOL",
      payload: { tool },
    });
  };

  const boardMouseDownHandler = (event) => {
    // if (boardState.activeToolItem === TOOL_ITEMS.TEXT) {
    //   dispatchBoardAction({
    //     type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
    //     payload: {
    //       actionType: TOOL_ACTION_TYPES.WRITING,
    //     },
    //   });
    //   return;
    // }
    dispatchBoardAction({
      type: "DRAW_DOWN",
      payload: {
        clientX: event.clientX,
        clientY: event.clientY,
      },
    });
  };

  const boardMouseMoveHandler = (event) => {
    dispatchBoardAction({
      type: "DRAW_MOVE",
      payload: {
        clientX: event.clientX,
        clientY: event.clientY,
      },
    });
  };
  const boardMouseUpHandler = (event) => {
    dispatchBoardAction({
      type: "DRAW_UP",
    });
  };

  const boardContextValue = {
    activeToolItem: boardState.activeToolItem,
    elements: boardState.elements,
    toolActionType: boardState.toolActionType,
    changeToolHandler,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
  };

  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
