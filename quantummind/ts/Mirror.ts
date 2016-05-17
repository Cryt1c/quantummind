/**
 * Created by Dominik on 10.05.2016.
 */

class Mirror extends GameElement {
    constructor(xPos:number, yPos:number, public alignment:Alignment) {
        super(xPos, yPos, 1, 1);
        if (this.alignment === Alignment.TOP_LEFT_TO_BOTTOM_RIGHT) {
            super.initBitmap("mirror");
        } else {
            super.initBitmap("mirror2");
        }
    }
}

enum Alignment{
    TOP_LEFT_TO_BOTTOM_RIGHT,
    BOTTOM_LEFT_TO_TOP_RIGHT
}