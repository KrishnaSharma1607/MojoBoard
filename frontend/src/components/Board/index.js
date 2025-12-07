import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import rough from "roughjs";
import BoardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../constants";
import classes from "./index.module.css";

function Board() {
  const canvasRef = useRef();
  const textAreaRef = useRef();

  const {
    elements,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    textAreaBlurHandler,
    toolActionType,
  } = useContext(BoardContext);

  const lastElement = elements[elements.length - 1];

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();

    let roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      switch (element.type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
          roughCanvas.draw(element.roughEle);
          break;

        case TOOL_ITEMS.TEXT:
          context.textBaseline = "top";
          context.font = `${element.size}px Caveat`;
          context.fillStyle = element.stroke;
          context.fillText(element.text, element.x1, element.y1);
          break;

        default:
          throw new Error("Type not recognized");
      }
    });

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  useEffect(() => {
    if (toolActionType === TOOL_ACTION_TYPES.WRITING && textAreaRef.current) {
      setTimeout(() => {
        textAreaRef.current.focus();
      }, 0);
    }
  }, [toolActionType]);

  const handleMouseDown = (event) => {
    boardMouseDownHandler(event);
  };

  const handleMouseMove = (event) => {
    if (toolActionType === TOOL_ACTION_TYPES.DRAWING)
      boardMouseMoveHandler(event);
  };

  const handleMouseUp = () => {
    boardMouseUpHandler();
  };

  return (
    <>
      {toolActionType === TOOL_ACTION_TYPES.WRITING && lastElement && (
        <textarea
          type="text"
          className={classes.textElementBox}
          ref={textAreaRef}
          style={{
            position: "absolute",
            top: lastElement.y1 ?? 0,
            left: lastElement.x1 ?? 0,
            fontSize: `${lastElement.size || 16}px`,
            color: lastElement.stroke || "#000",
          }}
          onBlur={(e) => {
            textAreaBlurHandler(e.target.value);
            boardMouseUpHandler();
          }}
        />
      )}

      <canvas
        ref={canvasRef}
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </>
  );
}

export default Board;
