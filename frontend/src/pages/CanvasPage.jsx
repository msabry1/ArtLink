import ControlMenu from "../components/ControlMenu/ControlMenu";
import logo from '../assets/logo.png'
import logo2 from '../assets/logo2.png'
import logo3 from '../assets/logo3.png'
import styles from './CanvasPage.module.css'
import ToolBar from "../components/ToolBar/ToolBar";


function CanvasPage(){
    return(
        <>
            <img className={styles.logo} src={logo3} alt="Art Link" />
            <ControlMenu></ControlMenu>
            <ToolBar></ToolBar>
            
        </>
    )
}

export default CanvasPage;