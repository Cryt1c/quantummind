/**
 * Created by Dominik on 10.05.2016.
 */

class Mirror extends GameElement {
    constructor(stage:createjs.Stage, xPos:number, yPos:number, orientation:number) {
        super(stage, xPos, yPos, 1, 1);

        this.orientation = orientation;

        if (this.orientation === 0) {
            super.initBitmap("mirror");
        } else {
            super.initBitmap("mirror2");
        }
    }

    rotate(){
        var rotateArr = [ "mirror", "mirror2" ];

        if( this.orientation == 0 ) {
            this.orientation = 1;
            super.rotate(1, rotateArr);
        } else {
            this.orientation = 0;
            super.rotate(0, rotateArr);
        }


    }
}
