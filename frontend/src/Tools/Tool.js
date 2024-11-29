class Tool {
    constructor(canvasContext, fillColor, strokeColor, strokeWidth){
        this.canvasContext = canvasContext;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    }

    setContext(canvasContext){
        this.canvasContext = canvasContext;
    }
    onMouseDown(event) {}
    onMouseMove(event) {}
    onMouseUp(event) {}
    onDblClick(event) {}
    onKeyDown(event) {}
}

export default Tool;