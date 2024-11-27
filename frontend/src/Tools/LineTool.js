import { Line } from "react-konva";
import Tool from "./Tool";
import Shapes from "../components/Canvas/Shapes";

class LineTool extends Tool {
  constructor(strokeColor, strokeWidth) {
    super();
    this.isDrawing = false;
    this.line = null;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
  }

  onMouseDown(event, canvasContext) {
    const { stage, layer } = canvasContext;
    this.isDrawing = true;

    const pointerPosition = stage.getPointerPosition();

    this.line = new window.Konva.Line({
      points: [pointerPosition.x, pointerPosition.y],
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
      lineCap: "round",
      lineJoin: "round",
    });

    layer.add(this.line);
    layer.batchDraw();
  }

  onMouseMove(event, canvasContext) {
    if (!this.isDrawing || !this.line) return;

    const { stage, layer } = canvasContext;
    const pointerPosition = stage.getPointerPosition();

    const newPoints = this.line.points();
    newPoints[2]=pointerPosition.x;
    newPoints[3]=pointerPosition.y;
    this.line.points(newPoints);

    layer.batchDraw();
  }

  onMouseUp(event, canvasContext) {
    if (this.line) {
      canvasContext.addShape(getLineObject(this.line));
      this.line.destroy();
      this.isDrawing = false;
      this.line = null;
    }
  }
}

function getLineObject(line) {
  return {
    type: Shapes.LINE,
    attributes: {
      points: line.attrs.points,
      stroke: line.attrs.stroke,
      strokeWidth: line.attrs.strokeWidth,
    },
  };
}

export default LineTool;
