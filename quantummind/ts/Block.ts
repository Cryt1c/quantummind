class Block extends GameElement{
    constructor(xPos:number, yPos:number, public alignment:BlockAlignment) {
        super(xPos, yPos, 1, 1);
    }

    getColor():string {
        return "black";
    }
}

enum BlockAlignment{
    HORIZONTAL,
    VERTICAL
}