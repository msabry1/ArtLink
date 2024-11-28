import { Line } from "react-konva";
import Tool from "./Tool";
import Shapes from "../components/Canvas/Shapes";

class PolygonTool extends Tool {
  constructor(fillColor, strokeColor, strokeWidth) {
    super();
    this.isDrawing = false;
    this.line = null;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
  }

  onMouseDown(event, canvasContext) {
    const { stage, layer } = canvasContext;
    this.isDrawing = true;

    const pointerPosition = stage.getPointerPosition();
    if(this.line){
      const newPoints = this.line.points().concat([pointerPosition.x, pointerPosition.y]);
      this.line.points(newPoints);
    } else {
      this.line = new window.Konva.Line({
        points: [pointerPosition.x, pointerPosition.y],
        fill: this.fillColor,
        stroke: this.strokeColor,
        strokeWidth: this.strokeWidth
      });
  
      layer.add(this.line);
    }
    layer.batchDraw();
  }

  onMouseMove(event, canvasContext) {
    if (!this.isDrawing || !this.line) return;

    const { stage, layer } = canvasContext;
    const pointerPosition = stage.getPointerPosition();

    const newPoints = this.line.points();
    newPoints[newPoints.length-2]=pointerPosition.x;
    newPoints[newPoints.length-1]=pointerPosition.y;
    this.line.points(newPoints);

    layer.batchDraw();
  }

  onDblClick(event, canvasContext){
    if (this.line) {
      canvasContext.addShape(getPolygonObject(this.line));
      this.line.destroy();

      this.isDrawing = false;
      this.line = null;
    }
  }
}

function getPolygonObject(line) {
  return {
    type: Shapes.LINE,
    attributes: {
      points: line.attrs.points,
      fill: line.attrs.fill,
      stroke: line.attrs.stroke,
      strokeWidth: line.attrs.strokeWidth,
      closed: true
    },
  };
}

export default PolygonTool;
