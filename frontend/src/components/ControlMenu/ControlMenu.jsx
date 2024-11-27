import styles from './ControlMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faBars,
    faRotateLeft, 
    faRotateRight, 
    faMagnifyingGlassPlus,
    faMagnifyingGlassMinus,
    faShare,
    faArrowUpFromBracket,
    faXmark
 } from '@fortawesome/free-solid-svg-icons' 
import { useState } from 'react'


function ControlMenu(){

    const [exapand, setExpand] = useState(false);

    return(
        <div className={styles.ControlMenu}>
            <button className={styles.expandBtn} onClick={() => setExpand(!exapand)}>
                {exapand?<FontAwesomeIcon icon={faXmark} />:<FontAwesomeIcon icon={faBars} />}
                
            </button>
            <div className={exapand?styles.expanded:styles.collapsed}>
                <button><FontAwesomeIcon icon={faRotateLeft} /></button>
                <button><FontAwesomeIcon icon={faRotateRight} /></button>
                <button><FontAwesomeIcon icon={faMagnifyingGlassPlus} /></button>
                <button><FontAwesomeIcon icon={faMagnifyingGlassMinus} /></button>
                <button><FontAwesomeIcon icon={faShare} /></button>
                <button><FontAwesomeIcon icon={faArrowUpFromBracket} /></button>
            </div>
        </div>
    )
}

export default ControlMenu;