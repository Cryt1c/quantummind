class Block extends GameElement{
    constructor(stage:createjs.Stage, xPos:number, yPos:number, public alignment:BlockAlignment) {
        super(stage, xPos, yPos, 1, 1);
        // TODO use different bitmaps for different alignments
        super.initBitmap("block.png");
    }
}

enum BlockAlignment{
    HORIZONTAL,
    VERTICAL
}