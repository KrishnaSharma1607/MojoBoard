import React, { useState } from "react";

import classes from "./index.module.css";
import cx from "classnames";
import {
  FaSlash,
  FaRegCircle,
  FaArrowRight,
  FaPaintBrush,
  FaEraser,
  FaUndoAlt,
  FaRedoAlt,
  FaFont,
  FaDownload,
} from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";

const Toolbar = () => {
  const [activeToolItem, setActiveToolItem] = useState("A");
  return (
    <div className={classes.container}>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "A",
        })}
        onClick={() => setActiveToolItem("A")}
      >
        <FaSlash />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "B",
        })}
        onClick={() => setActiveToolItem("B")}
      >
        <FaRegCircle />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "E",
        })}
        onClick={() => setActiveToolItem("E")}
      >
        <FaArrowRight />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "F",
        })}
        onClick={() => setActiveToolItem("F")}
      >
        <FaPaintBrush />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "G",
        })}
        onClick={() => setActiveToolItem("G")}
      >
        <FaUndoAlt />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "D",
        })}
        onClick={() => setActiveToolItem("D")}
      >
        <FaEraser />
      </div>
    </div>
  );
};

export default Toolbar;
