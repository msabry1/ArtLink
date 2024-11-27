import { Circle } from "react-konva";
import Tool from "./Tool";
import Shapes from "../components/Canvas/Shapes";

class CircleTool extends Tool {
  constructor(fillColor, strokeColor, strokeWidth) {
    super();
    this.isDrawing = false; // Flag to track whether drawing is in progress
    this.circle = null; // Reference to the current circle
    this.startPoint = null; // To store the starting point
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
  }

  // Handle mouse down event
  onMouseDown(event, canvasContext) {
    const { stage, layer } = canvasContext; // Access Stage and Layer from Canvas
    this.isDrawing = true;

    // Get the position where the mouse is pressed
    const pointerPosition = stage.getPointerPosition();
    this.startPoint = pointerPosition;

    // Create a new circle
    this.circle = new window.Konva.Circle({
      x: pointerPosition.x,
      y: pointerPosition.y,
      radius: 0, // Start with 0 radius
      fill: this.fillColor,
      stroke: this.strokeColor, // Default color for the circle border
      strokeWidth: this.strokeWidth, // Default stroke width
      draggable: false, // Can be set to true if needed
    });

    // Add the circle to the layer
    layer.add(this.circle);
    layer.batchDraw();
  }

  // Handle mouse move event
  onMouseMove(event, canvasContext) {
    if (!this.isDrawing || !this.startPoint || !this.circle) return;
    const { stage, layer } = canvasContext; // Access Stage and Layer from Canvas

    // Get the current pointer position
    const pointerPosition = stage.getPointerPosition();

    // Calculate the radius based on the distance from the start point
    const dx = pointerPosition.x - this.startPoint.x;
    const dy = pointerPosition.y - this.startPoint.y;
    const radius = Math.sqrt(dx * dx + dy * dy);

    // Update the circle radius
    this.circle.radius(radius);

    // Redraw the layer to reflect changes
    layer.batchDraw();
  }

  // Handle mouse up event
  onMouseUp(event, canvasContext) {
    if (this.circle) {
      canvasContext.addShape(getCircleObject(this.circle));
      this.isDrawing = false;
      this.circle = null; // Reset the circle reference
      this.startPoint = null; // Reset the start point
    }
  }
}

function getCircleObject(circle) {
  return {
    type: Shapes.CIRCLE,
    attributes: {
      x: circle.attrs.x,
      y: circle.attrs.y,
      radius: circle.attrs.radius,
      fill: circle.attrs.fill,
      stroke: circle.attrs.stroke,
      strokeWidth: circle.attrs.strokeWidth,
    },
  };
}

export default CircleTool;
