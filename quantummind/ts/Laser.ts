import Shape = createjs.Shape;
import Point = createjs.Point;

class Laser {
    public circle:Shape;
    private _won = false;
    public history:Point[];

    constructor(public xPos:number, public yPos:number, public direction:Direction, public gamefield:Field) {
        this.circle = new createjs.Shape();
        this.circle.graphics.beginFill("red").drawCircle(0, 0, 50);
        this.history = Array(new Point(xPos, yPos));
    }

    render(stage:Stage) {
        var r = FIELD_SIZE / 2;
        var circle = new createjs.Shape();
        var point;
        for (point of this.history) {
            circle.graphics.beginFill("red").drawCircle(point.x * FIELD_SIZE + r, point.y * FIELD_SIZE + r, r / 4);
            stage.addChild(circle);
        }
    }

    move() {
        switch (this.direction) {
            case Direction.East:
                this.xPos += STEP_SIZE;
                break;
            case Direction.West:
                this.xPos -= STEP_SIZE;
                break;
            case Direction.North:
                this.yPos -= STEP_SIZE;
                break;
            case Direction.South:
                this.yPos += STEP_SIZE;
                break;
        }

        this.history.push(new Point(this.xPos, this.yPos));


        if (this.xPos % 1 <= STEP_SIZE && this.yPos % 1 <= STEP_SIZE) {

            var x = Math.round(this.xPos);
            var y = Math.round(this.yPos);
            console.log(x + " : " + y);
            var currentField = this.gamefield.field[x][y];

            if (currentField instanceof Mirror) {
                if (currentField.alignment == Alignment.BOTTOM_LEFT_TO_TOP_RIGHT) {
                    if (this.direction == Direction.West) {
                        this.direction = Direction.South;
                    }
                    else if (this.direction == Direction.East) {
                        this.direction = Direction.North;
                    }
                    else if (this.direction == Direction.North) {
                        this.direction = Direction.East;
                    }
                    else if (this.direction == Direction.South) {
                        this.direction = Direction.West;
                    }
                }
                else if (currentField.alignment = Alignment.TOP_LEFT_TO_BOTTOM_RIGHT) {
                    if (this.direction == Direction.West) {
                        this.direction = Direction.North;
                    }
                    else if (this.direction == Direction.East) {
                        this.direction = Direction.South;
                    }
                    else if (this.direction == Direction.North) {
                        this.direction = Direction.West;
                    }
                    else if (this.direction == Direction.South) {
                        this.direction = Direction.East;
                    }
                }
            }

            if (currentField instanceof Detector) {
                if (currentField.direction == this.direction) {
                    this._won = true;
                }
            }
        }
    }


    get won():boolean {
        return this._won;
    }
}