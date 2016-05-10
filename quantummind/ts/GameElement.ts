import Stage = createjs.Stage;
/**
 * Created by Dominik on 10.05.2016.
 */

abstract class GameElement {
    constructor(public xPos:number, public yPos:number, public width:number, public height:number) {
    };

    abstract getColor():string;

    render(stage:Stage) {
        var r = FIELD_SIZE / 2;
        var shape = new createjs.Shape();
        shape.graphics.beginFill(this.getColor()).drawCircle(this.xPos * FIELD_SIZE + r, this.yPos * FIELD_SIZE + r, r);
        stage.addChild(shape);
    };
}