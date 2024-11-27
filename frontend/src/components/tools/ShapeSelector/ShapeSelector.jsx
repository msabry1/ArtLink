import React, { useState, useEffect } from 'react';
import styles from './ShapeSelector.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  
    faCircle,
    faDrawPolygon,
    faShapes,
    faSquare,

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
        <button value={"line"}><span className={styles.line}></span></button>
        <button value={"rectangle"}><span className={styles.rectangle}></span></button>
        <button value={"circle"}><span className={styles.circle}></span></button>
        <button value={"elipse"}><span className={styles.elipse}></span></button>
        <button value={"polygon"}><FontAwesomeIcon icon={faDrawPolygon}/></button>
        <button value={"triangle"}><span className={styles.triangle}>&#9651;</span></button>
      </div>
    </div>
  );
}

export default ShapeSelector;