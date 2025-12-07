import { TOOL_ITEMS } from "../constants";
import rough from "roughjs/bin/rough";

const gen = rough.generator();

export const createElement = (
  id,
  x1,
  y1,
  x2,
  y2,
  { type, stroke, fill, size }
) => {
  const element = {
    id,
    x1,
    y1,
    x2,
    y2,
    type,
    fill,
    stroke,
    size,
  };
  switch (type) {
    case TOOL_ITEMS.LINE:
      element.roughEle = gen.line(x1, y1, x2, y2);
      return element;
    case TOOL_ITEMS.RECTANGLE:
      element.roughEle = gen.rectangle(x1, y1, x2 - x1, y2 - y1);
      return element;
    case TOOL_ITEMS.TEXT:
      element.text = "";
      return element;
    default:
      throw new Error("Type not recognized");
  }
};
