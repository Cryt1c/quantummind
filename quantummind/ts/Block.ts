class Block extends GameElement{
    constructor(xPos:number, yPos:number, public alignment:BlockAlignment) {
        super(xPos, yPos, 1, 1);
        // TODO use different bitmaps for different alignments
        super.initBitmap("block");
    }
}

enum BlockAlignment{
    HORIZONTAL,
    VERTICAL
}