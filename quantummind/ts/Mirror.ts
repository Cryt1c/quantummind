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
}

enum MirrorOrientation {
    TOP_LEFT_TO_BOTTOM_RIGHT,
    BOTTOM_LEFT_TO_TOP_RIGHT
}
