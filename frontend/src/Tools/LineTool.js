import { generateShapeId } from "../components/utils";
import Shapes from "../shapes/Shapes";
import DrawingTool from "./drawingTool";

class LineTool extends DrawingTool {
  constructor(canvasContext, strokeColor, strokeWidth) {
    super(canvasContext, null, strokeColor, strokeWidth);
    this.isDrawing = false;
    this.line = null;
  }

  onMouseDown(event) {
    const { stage, layer } = this.canvasContext;
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

  onMouseMove(event) {
    if (!this.isDrawing || !this.line) return;

    const { stage, layer } = this.canvasContext;
    const pointerPosition = stage.getPointerPosition();

    const newPoints = this.line.points();
    newPoints[2] = pointerPosition.x;
    newPoints[3] = pointerPosition.y;
    this.line.points(newPoints);

    layer.batchDraw();
  }

  onMouseUp(event) {
    if (this.line) {
      this.canvasContext.addShape(getLineObject(this.line));
      this.line.destroy();
      this.isDrawing = false;
      this.line = null;
    }
  }
}

function getLineObject(line) {
  return {
    id: generateShapeId(),
    type: Shapes.LINE,
    attributes: {
      points: line.attrs.points,
      stroke: line.attrs.stroke,
      strokeWidth: line.attrs.strokeWidth,
    },
  };
}

export default LineTool;
