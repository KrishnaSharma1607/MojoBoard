import { useContext, useEffect, useRef } from "react";
import rough from "roughjs";
import BoardContext from "../../store/board-context"; // FIXED NAME
import { TOOL_ACTION_TYPES } from "../../constants";

function Board() {
  const canvasRef = useRef();

  const {
    elements,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    toolActionType,
  } = useContext(BoardContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();

    let roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      roughCanvas.draw(element.roughEle);
    });

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

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
      {/* {toolActionType === TOOL_ACTION_TYPES.WRITING && <textarea 
        type="text" 
        style={{
          top
        }}
      />} */}
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
