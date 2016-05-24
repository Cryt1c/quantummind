class Emitter extends GameElement {
    constructor(stage:createjs.Stage, xPos:number, yPos:number, public direction:Direction, orientation:number) {
        super(stage, xPos, yPos, 1, 1);
        super.initBitmap("emitter");
        this.orientation = orientation;
        this.rotateEmitter();
    }

    rotateEmitter() {
        // TODO: Extend for other directions and merge direction and orientation
        var rotateArr = ["emitter", "emitter2"];
        super.rotate(this.orientation, rotateArr);
    }

}