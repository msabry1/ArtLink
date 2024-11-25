import ControlMenu from "../components/ControlMenu/ControlMenu";
import logo from '../assets/logo.png'
import logo2 from '../assets/logo2.png'
import styles from './CanvasPage.module.css'


function CanvasPage(){
    return(
        <>
            <img className={styles.logo} src={logo2} alt="Art Link" />
            <ControlMenu></ControlMenu>
        </>
    )
}

export default CanvasPage;