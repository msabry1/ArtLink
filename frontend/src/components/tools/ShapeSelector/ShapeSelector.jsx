import React, { useState, useEffect } from 'react';
import styles from './ShapeSelector.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  
    faCircle,
    faDrawPolygon,
    faEllipsisH,
    faEllipsisVertical,
    faLineChart,
    faShapes,
    faSquare,
    faTriangleCircleSquare,
    faXmarksLines,

} from '@fortawesome/free-solid-svg-icons';

function ShapeSelector({ preselectedTool, onSelect }) {
  const [selectedTool, setSelectedTool] = useState(preselectedTool);

  const handleInputChange = (e) => {
    setSelectedTool(e.target.value);
  };

  // Trigger the parent's callback whenever the width changes
  useEffect(() => {
    // onSelect(selectedTool);
  }, [selectedTool, onSelect]);

  return (
    <div className={styles.container}>
      <button className={styles.button}><FontAwesomeIcon icon={faShapes}/></button>
      <div className={styles.shapesMenu}>
        <button value={"Line"}><FontAwesomeIcon icon={faShapes}/></button>
        <button value={"Line"}><FontAwesomeIcon icon={faSquare}/></button>
        <button value={"Line"}><FontAwesomeIcon icon={faCircle}/></button>
        <button value={"Line"}><FontAwesomeIcon icon={faShapes}/></button>
        <button value={"Line"}><FontAwesomeIcon icon={faDrawPolygon}/></button>
        <button value={"Line"}><FontAwesomeIcon icon={faShapes}/></button>
      </div>
    </div>
  );
}

export default ShapeSelector;