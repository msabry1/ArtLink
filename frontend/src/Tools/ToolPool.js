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
        [TOOLS.PENCIL]: new PencilTool(this.strokeColor, this.strokeWidth),
        [TOOLS.RECTANGLE]: new RectangleTool(this.fillColor, this.strokeColor, this.strokeWidth),
        [TOOLS.CIRCLE]: new CircleTool(this.fillColor, this.strokeColor, this.strokeWidth),
        [TOOLS.ELLIPSE]: new EllipseTool(this.fillColor, this.strokeColor, this.strokeWidth),
        [TOOLS.LINE]: new LineTool(this.strokeColor, this.strokeWidth),
        [TOOLS.POLYGON]: new PolygonTool(this.strokeColor, this.strokeWidth),
        [TOOLS.TRIANGLE]: new TriangleTool(this.fillColor, this.strokeColor, this.strokeWidth),
        [TOOLS.SELECT]: null
      }
    }

    getTool(toolName) {
      return this.tools[toolName]
    }
}

export default ToolPool;