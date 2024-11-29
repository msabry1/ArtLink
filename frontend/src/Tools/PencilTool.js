import Shapes from "../components/Canvas/Shapes";
import DrawingTool from "./drawingTool";

class PencilTool extends DrawingTool {
    constructor(canvasContext, strokeColor, strokeWidth) {
      super(canvasContext, null, strokeColor, strokeWidth);
      this.currentLine = null; // Temporary shape being drawn
    }
  
    onMouseDown(event) {
      const { stage, layer } = this.canvasContext; // Access Stage and Layer from Canvas
      const pos = stage.getPointerPosition();
      this.currentLine = new window.Konva.Line({
        points: [pos.x, pos.y],
        stroke: this.strokeColor,
        strokeWidth: this.strokeWidth,
        lineCap: 'round',
        lineJoin: 'round',
      });
      layer.add(this.currentLine);
      layer.batchDraw();
    }
  
    onMouseMove(event) {
      if (!this.currentLine) return;

      const { stage, layer } = this.canvasContext;
      const pos = stage.getPointerPosition();
      const points = this.currentLine.points().concat([pos.x, pos.y]);
      this.currentLine.points(points);
      layer.batchDraw();
    }
  
    onMouseUp(event) {
      if (this.currentLine) {
        // Finalize the shape
        this.canvasContext.addShape(getLineObject(this.currentLine));
        this.currentLine.destroy();
        this.currentLine = null;
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

export default PencilTool;
  