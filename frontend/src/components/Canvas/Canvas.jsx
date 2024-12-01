import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import ShapeComponent from "../../shapes/ShapeComponent";
import TOOLS from "../../Tools/Tools";
import { generateShapeId } from "../utils";
import Room from "../../API/WebSocket";

const Canvas = ({ selectedTool, toolPool, room }) => {
  const [shapes, setShapes] = useState([]);
  const [selectedId, selectShape] = useState(null);

  const stageRef = useRef();
  const layerRef = useRef();

  const addShape = (shape) => {
    localAddSahpe(shape);
    room.logShapeUpdate("add", shape);
  }

  const localAddSahpe = (shape) => {
    setShapes((prevShapes) => {
      // Check if the shape already exists based on its id
      const shapeExists = prevShapes.some((s) => s.id === shape.id);
      if (!shapeExists) {
        return [...prevShapes, shape];
      }
      return prevShapes;
    });
  };

  const modifyShape = (updatedShape) => {
    localModifySahpe(updatedShape);
    room.logShapeUpdate("modify", updatedShape);
  }

  const localModifySahpe = (updatedShape) => {
    setShapes( (p) => p.map((shape) =>
        shape.id === updatedShape.id ? updatedShape : shape
      )
    );
  };

  const deleteShape = (shapeId) => {
    localDeleteSahpe(shapeId);
    room.logShapeUpdate("delete", { id: shapeId });
  }

  const localDeleteSahpe = (shapeId) => {
    setShapes((prevShapes) => prevShapes.filter((shape) => shape.id !== shapeId));
  };

  useEffect(() => {
    // Initialize the Room instance
    if(!room)
      room = new Room(localAddSahpe, localModifySahpe, localDeleteSahpe);
    room.connect(1);
    return () => {
      // Disconnect when component unmounts
      room.disconnectRoom();
    };
  }, []);

  useEffect(() => {
    if (stageRef.current && layerRef.current) {
      const canvasContext = {
        stage: stageRef.current,
        layer: layerRef.current,
        addShape,
        deleteShape,
      };
      toolPool.updateCanvasContext(canvasContext);
    }
  }, [toolPool]);

  useEffect(() => {
    if (selectedTool !== TOOLS.SELECT) {
      selectShape(null);
    }
  }, [selectedTool]);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty || selectedTool !== TOOLS.SELECT) {
      selectShape(null);
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
      onMouseLeave={handleMouseUp}
      onDblClick={handleDblClick}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <Layer ref={layerRef}>
        {shapes.map((shape, index) => (
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
              shape.attributes = newAttrs;
              modifyShape(shape);
            }}
            onDelete={() => deleteShape(shape.id)}
            onDuplicate={() => {
              let newShape = structuredClone(shape);
              newShape.id = generateShapeId();
              addShape(newShape);
            }}
            isSelectMode={selectedTool === TOOLS.SELECT}
            isEraseMode={selectedTool === TOOLS.ERASER}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
