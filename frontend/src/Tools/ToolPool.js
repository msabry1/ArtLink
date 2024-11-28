import { Circle, Ellipse } from "react-konva";
import PencilTool from "./PencilTool";
import CircleTool from "./CircleTool";
import RectangleTool from "./RectangleTool";
import EllipseTool from "./EllipseTool";
import TriangleTool from "./TriangleTool";
import PolygonTool from "./PolygonTool";
import LineTool from "./LineTool";
import TOOLS from "./Tools";

class ToolPool{

    constructor(fillColor, strokeColor, strokeWidth, canvasContext){
      this.tools = {
        [TOOLS.PENCIL]: new PencilTool(canvasContext, strokeColor, strokeWidth),
        [TOOLS.RECTANGLE]: new RectangleTool(canvasContext, fillColor, strokeColor, strokeWidth),
        [TOOLS.CIRCLE]: new CircleTool(canvasContext, fillColor, strokeColor, strokeWidth),
        [TOOLS.ELLIPSE]: new EllipseTool(canvasContext, fillColor, strokeColor, strokeWidth),
        [TOOLS.LINE]: new LineTool(canvasContext, strokeColor, strokeWidth),
        [TOOLS.POLYGON]: new PolygonTool(canvasContext, fillColor, strokeColor, strokeWidth),
        [TOOLS.TRIANGLE]: new TriangleTool(canvasContext, fillColor, strokeColor, strokeWidth),
        [TOOLS.SELECT]: null
      }
    }

    getTool(toolName) {
      return this.tools[toolName]
    }

    updateContext(canvasContext) {
      Object.values(this.tools).forEach((tool) => {
        if (tool) {
          tool.setContext(canvasContext); // Each tool must have a `setContext` method
        }
      });
    }
}

export default ToolPool;