import Shape = createjs.Shape;

class Laser {
    public circle: Shape;

    constructor(public xPos:number, public yPos:number, public direction:Direction) {
        this.circle = new createjs.Shape();
        this.circle.graphics.beginFill("red").drawCircle(0, 0, 50);
    }

    render(stage: Stage) {
        var r = 40 / 2;
        var circle = new createjs.Shape();
        circle.graphics.beginFill("red").drawCircle(this.xPos, this.yPos, r);
        stage.addChild(circle);
    }

    move() {

    }
}