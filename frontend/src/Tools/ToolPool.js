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

    constructor(fillColor, strokeColor, strokeWidth){
      this.fillColor = fillColor;
      this.strokeColor = strokeColor;
      this.strokeWidth = strokeWidth;
      this.tools = {
        [TOOLS.PENCIL]: new PencilTool(strokeColor, strokeWidth),
        [TOOLS.RECTANGLE]: new RectangleTool(fillColor, strokeColor, strokeWidth),
        [TOOLS.CIRCLE]: new CircleTool(fillColor, strokeColor, strokeWidth),
        [TOOLS.ELLIPSE]: new EllipseTool(fillColor, strokeColor, strokeWidth),
        [TOOLS.LINE]: new LineTool(strokeColor, strokeWidth),
        [TOOLS.POLYGON]: new PolygonTool(fillColor, strokeColor, strokeWidth),
        [TOOLS.TRIANGLE]: new TriangleTool(fillColor, strokeColor, strokeWidth),
        [TOOLS.SELECT]: null
      }
    }

    getTool(toolName) {
      return this.tools[toolName]
    }
}

export default ToolPool;