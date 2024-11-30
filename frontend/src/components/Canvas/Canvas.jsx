import React, { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Ellipse,
  Line,
} from "react-konva";
import Shapes from "../../shapes/Shapes";
import TOOLS from "../../Tools/Tools";
import ShapeComponent from "../../shapes/ShapeComponent";
import { generateShapeId } from "../utils";

const Canvas = ({ selectedTool, toolPool }) => {
  const [shapes, setShapes] = useState([]);
  const [selectedId, selectShape] = useState(null);

  const stageRef = useRef();
  const layerRef = useRef();

  const addShape = (shape) => {
    setShapes((prevShapes) => [...prevShapes, shape]);
  };

  const modifyShape= (updatedShape) => {
    setShapes(
      shapes.map((shape) =>
        shape.id === updatedShape.id ? updatedShape : shape
      )
    );
  }

  const deleteShape = (shapeId) => {
    setShapes(shapes.filter(shape => shape.id !== shapeId));
  }


  useEffect(() => {
    if (stageRef.current && layerRef.current) {
      const canvasContext = {
        stage: stageRef.current,
        layer: layerRef.current,
        addShape,
        deleteShape
      };
      toolPool.updateCanvasContext(canvasContext);
    }
  }, [toolPool]);

  useEffect(() => {
    if(selectedTool!=TOOLS.SELECT)
      selectShape(null);
  }, [selectedTool])


  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty || selectedTool != TOOLS.SELECT) {
      selectShape(null);
      console.log(shapes);
    }
  };

  const handleMouseDown = (event) => {
    checkDeselect(event);
    toolPool.getTool(selectedTool)?.onMouseDown(event);
  };
  const handleMouseMove = (event) =>
    toolPool.getTool(selectedTool)?.onMouseMove(event);
  const handleMouseUp = (event) =>
    toolPool.getTool(selectedTool)?.onMouseUp(event);
  const handleDblClick = (event) =>
    toolPool.getTool(selectedTool)?.onDblClick(event);
  const handleClick = (event) => toolPool.getTool(selectedTool)?.onClick(event);
  const handleKeyDown = (event) =>
    toolPool.getTool(selectedTool)?.onKeyDown(event);

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDblClick={handleDblClick}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <Layer ref={layerRef}>
        {shapes.map((shape, index) => 
            <ShapeComponent
              key={index}
              id={shape.id}
              type={shape.type}
              shapeProps={shape.attributes}
              isSelected={shape.id === selectedId}
              onSelect={() => {
                selectShape(shape.id);
              }}
              onChange={(newAttrs) => {
                shape.attributes= newAttrs;
                modifyShape(shape)
              }}
              onDelete={()=>deleteShape(shape.id)}
              onDuplicate={()=>{
                let newShape = structuredClone(shape);
                newShape.id = generateShapeId();
                addShape(newShape);
              }}
              isSelectMode= {selectedTool==TOOLS.SELECT}
              isEraseMode= {selectedTool==TOOLS.ERASER}
            />
          )}
      </Layer>
    </Stage>
  );
};

export default Canvas;
