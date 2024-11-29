import { generateShapeId } from "../components/utils";
import Shapes from "../shapes/Shapes";
import DrawingTool from "./drawingTool";

class PolygonTool extends DrawingTool {
  constructor(canvasContext, fillColor, strokeColor, strokeWidth) {
    super(canvasContext, fillColor, strokeColor, strokeWidth);
    this.isDrawing = false;
    this.line = null;
  }

  onMouseDown(event) {
    const { stage, layer } = this.canvasContext;
    this.isDrawing = true;

    const pointerPosition = stage.getPointerPosition();
    if (this.line) {
      const newPoints = this.line
        .points()
        .concat([pointerPosition.x, pointerPosition.y]);
      this.line.points(newPoints);
    } else {
      this.line = new window.Konva.Line({
        points: [pointerPosition.x, pointerPosition.y],
        fill: this.fillColor,
        stroke: this.strokeColor,
        strokeWidth: this.strokeWidth,
        lineCap: "round",
        lineJoin: "round",
      });

      layer.add(this.line);
    }
    layer.batchDraw();
  }

  onMouseMove(event) {
    if (!this.isDrawing || !this.line) return;

    const { stage, layer } = this.canvasContext;
    const pointerPosition = stage.getPointerPosition();

    const newPoints = this.line.points();
    newPoints[newPoints.length - 2] = pointerPosition.x;
    newPoints[newPoints.length - 1] = pointerPosition.y;
    this.line.points(newPoints);

    layer.batchDraw();
  }

  onDblClick(event) {
    if (this.line) {
      this.canvasContext.addShape(getPolygonObject(this.line));
      this.line.destroy();

      this.isDrawing = false;
      this.line = null;
    }
  }
}

function getPolygonObject(line) {
  return {
    id: generateShapeId(),
    type: Shapes.LINE,
    attributes: {
      points: line.attrs.points,
      fill: line.attrs.fill,
      stroke: line.attrs.stroke,
      strokeWidth: line.attrs.strokeWidth,
    },
  };
}

export default PolygonTool;
