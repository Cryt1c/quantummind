class Detector extends GameElement {
    constructor(stage:createjs.Stage, xPos:number, yPos:number) {
        super(stage, xPos, yPos, 1, 1);
        super.initBitmap("detector");
    }
}