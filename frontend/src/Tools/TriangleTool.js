import { Line } from "react-konva";
import Tool from "./Tool";
import Shapes from "../components/Canvas/Shapes";

class TriangleTool extends Tool {
  constructor(fillColor, strokeColor, strokeWidth) {
    super();
    this.isDrawing = false;
    this.triangle = null;
    this.startPoint = null;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
  }

  onMouseDown(event, canvasContext) {
    const { stage, layer } = canvasContext;
    this.isDrawing = true;

    const pointerPosition = stage.getPointerPosition();
    this.startPoint = pointerPosition;

    this.triangle = new window.Konva.Line({
      points: [pointerPosition.x, pointerPosition.y, pointerPosition.x, pointerPosition.y],
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
      closed: true, // Close the shape to form a triangle
    });

    layer.add(this.triangle);
    layer.batchDraw();
  }

  onMouseMove(event, canvasContext) {
    if (!this.isDrawing || !this.startPoint || !this.triangle) return;

    const { stage, layer } = canvasContext;
    const pointerPosition = stage.getPointerPosition();

    const points = [
      this.startPoint.x, this.startPoint.y, // First point (start point)
      pointerPosition.x, pointerPosition.y, // Second point (current mouse position)
      this.startPoint.x + (pointerPosition.x - this.startPoint.x), this.startPoint.y, // Third point (base of the triangle)
    ];

    this.triangle.points(points);
    layer.batchDraw();
  }

  onMouseUp(event, canvasContext) {
    if (this.triangle) {
      canvasContext.addShape(getTriangleObject(this.triangle));
      this.isDrawing = false;
      this.triangle = null;
      this.startPoint = null;
    }
  }
}

function getTriangleObject(triangle) {
  return {
    type: Shapes.TRIANGLE,
    attributes: {
      points: triangle.attrs.points,
      fill: triangle.attrs.fill,
      stroke: triangle.attrs.stroke,
      strokeWidth: triangle.attrs.strokeWidth,
    },
  };
}

export default TriangleTool;
