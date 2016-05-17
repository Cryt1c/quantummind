class Emitter extends GameElement {
    constructor(stage:createjs.Stage, xPos:number, yPos:number, public direction: Direction) {
        super(stage, xPos, yPos, 1, 1);
        super.initBitmap("emitter");
    }
    
    
}