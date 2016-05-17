/**
 * Created by Dominik on 10.05.2016.
 */

class Detector extends GameElement {
    constructor(stage:createjs.Stage, xPos:number, yPos:number, public direction: Direction) {
        super(stage, xPos, yPos, 1, 1);
        super.initBitmap("detector");
    }
}