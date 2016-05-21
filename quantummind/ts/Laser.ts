import Shape = createjs.Shape;
import Point = createjs.Point;

class Laser {
    public circle:Shape;
    private _won = false;
    private _gameOver = false;
    public history:Point[];
    private xPos;
    private yPos;
    private direction;
    private _blink;

    constructor(public gamefield:Field) {
        this.xPos = gamefield.source.xPos;
        this.yPos = gamefield.source.yPos;
        this.direction = gamefield.source.direction;
        this.circle = new createjs.Shape();
        this.circle.graphics.beginFill("red").drawCircle(0, 0, 50);
        this.history = Array(new Point(this.xPos, this.yPos));
        this.blink = false;
    }

    render(stage:Stage) {
        if(this.blink) return;
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
            default:
                // do nothing
                break;
        }

        this.history.push(new Point(this.xPos, this.yPos));

        if(this.blink) return;

        //console.log(this.xPos + " " + this.yPos);
        if (Math.abs(this.xPos % 1) < STEP_SIZE && Math.abs(this.yPos % 1) < STEP_SIZE) {

            var x = Math.round(this.xPos);
            var y = Math.round(this.yPos);
            //console.log(x + " : " + y);

            if (x < 0 || y < 0 || x >= this.gamefield.width || y >= this.gamefield.height) {
                // prevent laser from going off-grid
                this.direction = null;
                this._gameOver = true;
                return;
            }

            var currentField = this.gamefield.field[x][y];

            if (currentField instanceof Mirror) {
                //console.log("field alignment: " + currentField.orientation + " laserdirection: " + this.direction);
                if (currentField.orientation == MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT) {
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
                else if (currentField.orientation == MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT) {
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

            else if (currentField instanceof Detector) {
                this._won = true;
                this.direction = null;
                continueToNextLevel();
            }

            else if (currentField instanceof Block) {
                this.direction = null;
                this._gameOver = true;
            }
        }
    }


    get won():boolean {
        return this._won;
    }

    get gameOver():boolean {
        return this._gameOver;
    }

    get blink() {
        return this._blink;
    }

    set blink(value) {
        this._blink = value;
    }
}