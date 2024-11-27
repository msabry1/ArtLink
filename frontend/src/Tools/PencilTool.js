import Shapes from "../components/Canvas/Shapes";
import Tool from "./Tool";

class PencilTool extends Tool {
    constructor(color, strokeWidth) {
      super();
      this.color = color;
      this.strokeWidth = strokeWidth;
      this.currentLine = null; // Temporary shape being drawn
    }
  
    onMouseDown(event, canvasContext) {
      const { stage, layer } = canvasContext; // Access Stage and Layer from Canvas
      const pos = stage.getPointerPosition();
      this.currentLine = new window.Konva.Line({
        points: [pos.x, pos.y],
        stroke: this.color,
        strokeWidth: this.strokeWidth,
        lineCap: 'round',
        lineJoin: 'round',
      });
      layer.add(this.currentLine);
      layer.batchDraw();
    }
  
    onMouseMove(event, canvasContext) {
      if (!this.currentLine) return;
      const pos = canvasContext.stage.getPointerPosition();
      const points = this.currentLine.points().concat([pos.x, pos.y]);
      this.currentLine.points(points);
      canvasContext.layer.batchDraw();
    }
  
    onMouseUp(event, canvasContext) {
      if (this.currentLine) {
        // Finalize the shape
        canvasContext.addShape(getLineObject(this.currentLine));
        this.currentLine.destroy();
        this.currentLine = null;
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

export default PencilTool;
  