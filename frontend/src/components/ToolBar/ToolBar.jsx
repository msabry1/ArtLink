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

function ToolBar(){
    const [expand, setExpand] = useState(false);
    const [fillColor, setFillColor] = useState("#FFFFFF");
    const [StrokeColor, setStrokeColor] = useState("#FFFFFF");

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
                <button><FontAwesomeIcon icon={faShapes} /></button>
                <button><FontAwesomeIcon icon={faImage} /></button>
                <button>T</button>
                <button><FontAwesomeIcon icon={faBorderTopLeft} /></button>
                <ColorPicker onColorChange={setStrokeColor}/>
                <ColorPicker onColorChange={setFillColor}/>
            </div>
        </div>
    )
}

export default ToolBar;