/**
 * Created by Dominik on 10.05.2016.
 */

class Detector extends GameElement {
    constructor(xPos:number, yPos:number, public direction: Direction) {
        super(xPos, yPos, 1, 1);
        super.initBitmap("detector");
    }
}