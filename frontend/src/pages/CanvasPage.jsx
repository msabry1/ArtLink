import ControlMenu from "../components/ControlMenu/ControlMenu";
import logo from '../assets/logo.png'
import logo2 from '../assets/logo2.png'
import logo3 from '../assets/logo3.png'
import styles from './CanvasPage.module.css'
import ToolBar from "../components/ToolBar/ToolBar";
import Canvas from "../components/Canvas/Canvas";
import { useState } from "react";
import TOOLS from "../Tools/Tools";
import ToolPool from "../Tools/ToolPool";


function CanvasPage(){
    const [selectedTool, setSelectedTool] = useState(TOOLS.RECTANGLE);
    const [fillColor, setFillColor] = useState("#00bb00");
    const [strokeColor, setStrokeColor] = useState("#000000");
    const [strokeWidth, setStrokeWidth] = useState(5);

    const toolPool = new ToolPool(fillColor, strokeColor, strokeWidth);

    return(
        <>
            <Canvas
                fillColor={fillColor}
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
                selectedTool={selectedTool}
                toolPool={toolPool}
            />
            <ToolBar
                fillColor={fillColor}
                setFillColor={setFillColor}
                strokeColor={strokeColor}
                setStrokeColor={setStrokeColor}
                strokeWidth={strokeWidth}
                setStrokeWidth={setStrokeWidth}
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
            />
            <ControlMenu></ControlMenu>
            <img className={styles.logo} src={logo3} alt="Art Link" />
        </>
    )
}

export default CanvasPage;