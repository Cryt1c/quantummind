/**
 * Created by Dominik on 10.05.2016.
 */

class Mirror extends GameElement {
    constructor(xPos:number, yPos:number, public alignment:Alignment) {
        super(xPos, yPos, 1, 1);
    }

    getColor() {
        return "blue";
    }
}

enum Alignment{
    TOP_LEFT_TO_BOTTOM_RIGHT,
    BOTTOM_LEFT_TO_TOP_RIGHT
}