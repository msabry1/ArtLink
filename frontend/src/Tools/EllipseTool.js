import { Ellipse } from "react-konva";
import Tool from "./Tool";
import Shapes from "../components/Canvas/Shapes";

class EllipseTool extends Tool {
  constructor(fillColor, strokeColor, strokeWidth) {
    super();
    this.isDrawing = false;
    this.ellipse = null;
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

    this.ellipse = new window.Konva.Ellipse({
      x: pointerPosition.x,
      y: pointerPosition.y,
      radiusX: 0,
      radiusY: 0,
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
    });

    layer.add(this.ellipse);
    layer.batchDraw();
  }

  onMouseMove(event, canvasContext) {
    if (!this.isDrawing || !this.startPoint || !this.ellipse) return;

    const { stage, layer } = canvasContext;
    const pointerPosition = stage.getPointerPosition();

    const radiusX = Math.abs(pointerPosition.x - this.startPoint.x);
    const radiusY = Math.abs(pointerPosition.y - this.startPoint.y);

    this.ellipse.radiusX(radiusX);
    this.ellipse.radiusY(radiusY);

    layer.batchDraw();
  }

  onMouseUp(event, canvasContext) {
    if (this.ellipse) {
      canvasContext.addShape(getEllipseObject(this.ellipse));
      this.ellipse.destroy();
      this.isDrawing = false;
      this.ellipse = null;
      this.startPoint = null;
    }
  }
}

function getEllipseObject(ellipse) {
  return {
    type: Shapes.ELLIPSE,
    attributes: {
      x: ellipse.attrs.x,
      y: ellipse.attrs.y,
      radiusX: ellipse.attrs.radiusX,
      radiusY: ellipse.attrs.radiusY,
      fill: ellipse.attrs.fill,
      stroke: ellipse.attrs.stroke,
      strokeWidth: ellipse.attrs.strokeWidth,
    },
  };
}

export default EllipseTool;
