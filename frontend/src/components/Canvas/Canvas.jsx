import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import ShapeComponent from "../../shapes/ShapeComponent";
import TOOLS from "../../Tools/Tools";
import { generateShapeId } from "../utils";
import Room from "../../API/WebSocket";

const Canvas = ({ selectedTool, toolPool, room, roomId }) => {
  const [shapes, setShapes] = useState([]);
  const [selectedId, selectShape] = useState(null);

  const stageRef = useRef();
  const layerRef = useRef();
  const roomRef = useRef();


  const addShape = (shape) => {
    localAddSahpe(shape);
    roomRef.current?.logShapeUpdate("add", shape);
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
    roomRef.current?.logShapeUpdate("modify", updatedShape);
  }

  const localModifySahpe = (updatedShape) => {
    setShapes( (p) => p.map((shape) =>
        shape.id === updatedShape.id ? updatedShape : shape
      )
    );
  };

  const deleteShape = (shapeId) => {
    localDeleteSahpe(shapeId);
    roomRef.current?.logShapeUpdate("delete", { id: shapeId });
  }

  const localDeleteSahpe = (shapeId) => {
    setShapes((prevShapes) => prevShapes.filter((shape) => shape.id !== shapeId));
  };

  useEffect(() => {


    const handleKeyDown = (event) => {
      toolPool.getTool(selectedTool)?.onKeyDown(event);
    };
    if(selectedTool == TOOLS.TEXT){
      const stage = stageRef.current;
      if (stage) {
        const stageContent = stage.content;
        stageContent.tabIndex = 1;
    
        stageContent.addEventListener("keydown", handleKeyDown);
        stageContent.focus();
      } 

    } else {
      const stage = stageRef.current;
      const stageContent = stage.content;
      stageContent.removeEventListener("keydown", handleKeyDown);
      toolPool.getTool(TOOLS.TEXT).cleanup();
    }
    return () => {
      const stage = stageRef.current;
      if(!stage) return;
      const stageContent = stage.content;
      stageContent.removeEventListener("keydown", handleKeyDown);
    }
  }, [toolPool, selectedTool]);
  
  useEffect(() => {
    // Initialize the Room instance
    room = new Room(roomId, localAddSahpe, localModifySahpe, localDeleteSahpe);
    room.connect();
    roomRef.current = room;
    console.log(`room: ${roomId}`);
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
        modifyShape,
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
    console.log(shapes)
    checkDeselect(event);
    toolPool.getTool(selectedTool)?.onMouseDown(event);
  };
  const handleMouseMove = (event) =>{
    toolPool.getTool(selectedTool)?.onMouseMove(event);
  }
  const handleMouseUp = (event) =>
    toolPool.getTool(selectedTool)?.onMouseUp(event);
  const handleDblClick = (event) =>
    toolPool.getTool(selectedTool)?.onDblClick(event);
  const handleClick = (event) => toolPool.getTool(selectedTool)?.onClick(event);

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
