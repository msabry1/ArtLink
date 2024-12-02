import styles from './ControlMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faBars,
    faRotateLeft, 
    faRotateRight, 
    faShare,
    faArrowUpFromBracket,
    faXmark,
    faFileArchive,
    faSignOut,
    faDoorOpen,
    faUpload,
    faFileImport
 } from '@fortawesome/free-solid-svg-icons' 
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'


const ControlMenu = ({ onExportPNG, onExportJSON, onExportXML, onImport }) => {

    const [exapand, setExpand] = useState(false);
    const inputRef = useRef();

    return(
        <div className={styles.ControlMenu}>
            <button className={styles.expandBtn} onClick={() => setExpand(!exapand)}>
                {exapand?<FontAwesomeIcon icon={faXmark} />:<FontAwesomeIcon icon={faBars} />}
                
            </button>
            <div className={exapand?styles.expanded:styles.collapsed}>
                <button><FontAwesomeIcon icon={faRotateLeft} /></button>
                <button><FontAwesomeIcon icon={faRotateRight} /></button>
                <button><FontAwesomeIcon icon={faShare} /></button>
                <button onClick={() => inputRef.current.click()}><FontAwesomeIcon icon={faFileImport} /></button>
                <input
                    ref={inputRef}
                    type="file"
                    accept=".json,.xml"
                    style={{ display: "none" }} // Hide the input
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) onImport(file);
                    }}
                />
                <button onClick={onExportPNG}><FontAwesomeIcon icon={faArrowUpFromBracket} />PNG</button>
                <button onClick={onExportJSON}><FontAwesomeIcon icon={faArrowUpFromBracket} />JSON</button>
                <button onClick={onExportXML}><FontAwesomeIcon icon={faArrowUpFromBracket} />XML</button>
                <button>
                    <Link className={styles.danger} to={"/Home"}><FontAwesomeIcon icon={faDoorOpen} /></Link>
                </button>
            </div>
        </div>
    )
}

export default ControlMenu;