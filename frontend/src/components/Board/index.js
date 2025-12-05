import { useEffect, useRef } from "react";
import rough from "roughjs";

function Board() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let roughCanvas = rough.canvas(canvas);
    let generator = roughCanvas.generator;
    let rect1 = generator.rectangle(10, 10, 100, 100);
    let rect2 = generator.rectangle(10, 120, 100, 100, { fill: "red" });
    roughCanvas.draw(rect1);
    roughCanvas.draw(rect2);
  }, []);
  const handleMouseDown = (event) => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const clientX = event.clientX;
    const clientY = event.clientY;
    let roughCanvas = rough.canvas(canvas);
    let generator = roughCanvas.generator;
    let line1 = generator.line(0, 0, clientX, clientY);
    roughCanvas.draw(line1);
  };
  return <canvas ref={canvasRef} id="canvas" onMouseDown={handleMouseDown} />;
}

export default Board;
