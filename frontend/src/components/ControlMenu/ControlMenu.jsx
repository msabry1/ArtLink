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
import { useState } from 'react'
import { Link } from 'react-router-dom'


const ControlMenu = ({ onExport }) => {

    const [exapand, setExpand] = useState(false);

    return(
        <div className={styles.ControlMenu}>
            <button className={styles.expandBtn} onClick={() => setExpand(!exapand)}>
                {exapand?<FontAwesomeIcon icon={faXmark} />:<FontAwesomeIcon icon={faBars} />}
                
            </button>
            <div className={exapand?styles.expanded:styles.collapsed}>
                <button><FontAwesomeIcon icon={faRotateLeft} /></button>
                <button><FontAwesomeIcon icon={faRotateRight} /></button>
                <button><FontAwesomeIcon icon={faShare} /></button>
                <button onClick={onExport}><FontAwesomeIcon icon={faFileImport} /></button>
                <button onClick={onExport}><FontAwesomeIcon icon={faArrowUpFromBracket} /></button>
                <button>
                    <Link className={styles.danger} to={"/Home"}><FontAwesomeIcon icon={faDoorOpen} /></Link>
                </button>
            </div>
        </div>
    )
}

export default ControlMenu;