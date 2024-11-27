import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect, Circle, Ellipse, Line, RegularPolygon } from 'react-konva';
import Shapes from './Shapes';
import TOOLS from '../../Tools/Tools';
import ToolPool from '../../Tools/ToolPool';

function populate(type, attributes, drag) {
  switch (type) {
    case Shapes.RECTANGLE:
      return <Rect {...attributes} draggable={drag} />;
    case Shapes.CIRCLE:
      return <Circle {...attributes} draggable={drag}/>;
    case Shapes.ELLIPSE:
      return <Ellipse {...attributes} draggable={drag} />;
    case Shapes.LINE:
      return <Line {...attributes} lineCap= "round" lineJoin= "round" draggable={drag} />;
    case Shapes.POLYGON:
      return <RegularPolygon {...attributes} draggable={drag} />;
    case Shapes.TRIANGLE:
      return <RegularPolygon {...attributes} sides={3} draggable={drag} />;
    default:
      return <Line {...attributes} draggable={drag} />;
  }
}



const Canvas = ({ fillColor, strokeColor, strokeWidth, selectedTool }) => {
  const [shapes, setShapes] = useState([]);
  const stageRef = useRef();
  const layerRef = useRef();
  const toolPool = new ToolPool(fillColor, strokeColor, strokeWidth);

  const addShape = (shape) => {
    setShapes((prevShapes) => [...prevShapes, shape]);
  };

  const canvasContext = {
    stage: stageRef.current,
    layer: layerRef.current,
    addShape,
  };

  const handleMouseDown = (event) => toolPool.getTool(selectedTool)?.onMouseDown(event, canvasContext);
  const handleMouseMove = (event) => toolPool.getTool(selectedTool)?.onMouseMove(event, canvasContext);
  const handleMouseUp = (event) => toolPool.getTool(selectedTool)?.onMouseUp(event, canvasContext);
  const handleDblClick = (event) => toolPool.getTool(selectedTool)?.onDblClick(event, canvasContext);
  const handleKeyDown = (event) => toolPool.getTool(selectedTool)?.onKeyDown(event, canvasContext);

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDblClick={handleDblClick}
    >
      <Layer ref={layerRef}>
        {shapes.map((shape, index) => (
          <React.Fragment key={index}>
            {populate(shape.type, shape.attributes, (selectedTool===TOOLS.SELECT))}
          </React.Fragment>
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;