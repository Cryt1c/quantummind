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

    rotateMirror(){
        var rotateArr = [ "mirror", "mirror2" ];

        if( this.orientation == 0 ) {
            this.orientation = 1;
            super.rotate(this.orientation, rotateArr);
        } else {
            this.orientation = 0;
            super.rotate(this.orientation, rotateArr);
        }


    }
}
