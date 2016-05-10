class Block extends GameElement{
    constructor(xPos:number, yPos:number, public alignment:BlockAlignment) {
        super(xPos, yPos, 1, 1);
    }

    getBitmapString():string {
        return "mirror.png";
    }
}

enum BlockAlignment{
    HORIZONTAL,
    VERTICAL
}