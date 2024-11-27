import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ToolBar.module.css'
import { 
    faAngleUp,
    faArrowPointer,
    faPencil,
    faShapes,
    faBorderTopLeft,
    faImage
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import ColorPicker from '../tools/ColorPicker/ColorPicker';
import WeightSlider from '../tools/WeightSlider/WeightSlider';
import ShapeSelector from '../tools/ShapeSelector/ShapeSelector';

function ToolBar(){
    const [expand, setExpand] = useState(false);
    const [fillColor, setFillColor] = useState("#00bb00");
    const [strokeColor, setStrokeColor] = useState("#000000");
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [selectedTool, setSelectedTool] = useState()

    return (
        <div className={`${styles.ToolBar} ${expand ? '' : styles.translateDown}`}>
            <button 
                className={`${styles.arrowbtn} ${expand ? styles.horizontalflip : ''}`} 
                onClick={() => setExpand(!expand)}
            >
                <FontAwesomeIcon icon={faAngleUp} />
            </button>
            <div className={styles.ToolBtns}>
                <button><FontAwesomeIcon icon={faArrowPointer} /></button>
                <button><FontAwesomeIcon icon={faPencil} /></button>
                <ShapeSelector preselectedTool={selectedTool} onSelect={selectedTool}/>
                <button><FontAwesomeIcon icon={faImage} /></button>
                <button>T</button>
                <WeightSlider initialWidth={strokeWidth} onWidthChange={setStrokeWidth}/>
                <ColorPicker initialColor={strokeColor} onColorChange={setStrokeColor}/>
                <ColorPicker initialColor={fillColor} onColorChange={setFillColor}/>
            </div>
        </div>
    )
}

export default ToolBar;