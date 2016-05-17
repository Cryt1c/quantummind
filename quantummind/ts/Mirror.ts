/**
 * Created by Dominik on 10.05.2016.
 */

class Mirror extends GameElement {
    constructor(xPos:number, yPos:number, public alignment:Alignment) {
        super(xPos, yPos, 1, 1);

        //this.rotate();

        if (this.alignment === Alignment.TOP_LEFT_TO_BOTTOM_RIGHT) {
            super.initBitmap("mirror.png");
        } else {
            super.initBitmap("mirror2.png");
        }

    }
    
    rotate(){
        if (this.alignment === Alignment.TOP_LEFT_TO_BOTTOM_RIGHT) {
            this.alignment == Alignment.BOTTOM_LEFT_TO_TOP_RIGHT;
            super.initBitmap("mirror2.png");
        } else {
            this.alignment == Alignment.TOP_LEFT_TO_BOTTOM_RIGHT;
            super.initBitmap("mirror.png");
        }

        super.render();
    }


}

enum Alignment{
    TOP_LEFT_TO_BOTTOM_RIGHT,
    BOTTOM_LEFT_TO_TOP_RIGHT
}