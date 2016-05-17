/**
 * Created by Dominik on 10.05.2016.
 */

class Mirror extends GameElement {
    constructor(xPos:number, yPos:number, orientation:number) {
        super(xPos, yPos, 1, 1);

        this.orientation = orientation;

        if (this.orientation === 0) {
            super.initBitmap("mirror.png");
        } else {
            super.initBitmap("mirror2.png");
        }
        
    }

}