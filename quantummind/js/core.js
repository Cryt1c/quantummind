var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../definitelyTyped/easeljs.d.ts" />
/// <reference path="../definitelyTyped/jquery.d.ts" />
/// <reference path="../definitelyTyped/preloadjs.d.ts" />
var Ticker = createjs.Ticker;
var FIELD_SIZE = 40;
var STEP_SIZE = 0.2;
function init() {
    document.onkeydown = keyPressed;
    var stage = new createjs.Stage("demoCanvas");
    createjs.Ticker.paused = !createjs.Ticker.paused;
    var gamefield = new Field(3, 3);
    var source = new Source(0, 2, Direction.East);
    gamefield.field[0][2] = source;
    gamefield.field[2][2] = new Mirror(2, 2, Alignment.BOTTOM_LEFT_TO_TOP_RIGHT);
    gamefield.field[2][0] = new Detector(2, 0, Direction.North);
    gamefield.field[2][1] = new Block(2, 1, BlockAlignment.HORIZONTAL);
    var laser = new Laser(source.xPos, source.yPos, source.direction, gamefield);
    gamefield.render(stage);
    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick(event) {
        if (!createjs.Ticker.paused) {
            laser.move();
            laser.render(stage);
            stage.update();
            if (laser.won) {
                createjs.Ticker.paused = true;
                console.log("won");
            }
        }
    }
    function keyPressed(event) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 80:
                createjs.Ticker.paused = !createjs.Ticker.paused;
                console.log("pause");
                break;
            case 83:
                stage.update();
                console.log("pause");
                break;
        }
    }
}
/**
 * Created by Dominik on 10.05.2016.
 */
var Direction;
(function (Direction) {
    Direction[Direction["North"] = 0] = "North";
    Direction[Direction["East"] = 1] = "East";
    Direction[Direction["South"] = 2] = "South";
    Direction[Direction["West"] = 3] = "West";
})(Direction || (Direction = {}));
var Stage = createjs.Stage;
var Bitmap = createjs.Bitmap;
/**
 * Created by Dominik on 10.05.2016.
 */
var GameElement = (function () {
    function GameElement(xPos, yPos, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.bitmap = new createjs.Bitmap("assets/" + this.getBitmapString());
        var img = this.bitmap.image;
        // console.log("before: " + this.bitmap.scaleX + " " + img.width);
        this.bitmap.scaleX = FIELD_SIZE / img.width;
        this.bitmap.scaleY = FIELD_SIZE / img.height;
        // console.log("after: " + this.bitmap.scaleX + " " + img.width);
    }
    ;
    GameElement.prototype.render = function (stage) {
        this.bitmap.x = this.xPos * FIELD_SIZE;
        this.bitmap.y = this.yPos * FIELD_SIZE;
        // if (this instanceof Mirror) {
        //     console.log(this.bitmap.x + " " + this.bitmap.y + " " + this.bitmap.regY);
        // }
        stage.addChild(this.bitmap);
    };
    ;
    return GameElement;
}());
/**
 * Created by Dominik on 10.05.2016.
 */
var Source = (function (_super) {
    __extends(Source, _super);
    function Source(xPos, yPos, direction) {
        _super.call(this, xPos, yPos, 1, 1);
        this.direction = direction;
    }
    Source.prototype.getBitmapString = function () {
        return "source.png";
    };
    return Source;
}(GameElement));
/**
 * Created by Dominik on 10.05.2016.
 */
var Detector = (function (_super) {
    __extends(Detector, _super);
    function Detector(xPos, yPos, direction) {
        _super.call(this, xPos, yPos, 1, 1);
        this.direction = direction;
    }
    Detector.prototype.getBitmapString = function () {
        return "detector.png";
    };
    return Detector;
}(GameElement));
/**
 * Created by Dominik on 10.05.2016.
 */
var Mirror = (function (_super) {
    __extends(Mirror, _super);
    function Mirror(xPos, yPos, alignment) {
        _super.call(this, xPos, yPos, 1, 1);
        this.alignment = alignment;
    }
    Mirror.prototype.getBitmapString = function () {
        if (this.alignment == Alignment.TOP_LEFT_TO_BOTTOM_RIGHT) {
            return "mirror.png";
        }
        else {
            return "mirror2.png";
        }
    };
    return Mirror;
}(GameElement));
var Alignment;
(function (Alignment) {
    Alignment[Alignment["TOP_LEFT_TO_BOTTOM_RIGHT"] = 0] = "TOP_LEFT_TO_BOTTOM_RIGHT";
    Alignment[Alignment["BOTTOM_LEFT_TO_TOP_RIGHT"] = 1] = "BOTTOM_LEFT_TO_TOP_RIGHT";
})(Alignment || (Alignment = {}));
/**
 * Created by Dominik on 10.05.2016.
 */
var Field = (function () {
    function Field(width, height) {
        this.width = width;
        this.height = height;
        this.field = [];
        for (var i = 0; i < this.width; i++) {
            this.field[i] = [];
            for (var j = 0; j < this.height; j++) {
                this.field[i][j] = null;
            }
        }
    }
    Field.prototype.render = function (stage) {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                var elem = this.field[i][j];
                if (elem != null) {
                    elem.render(stage);
                }
            }
        }
    };
    return Field;
}());
var Shape = createjs.Shape;
var Point = createjs.Point;
var Laser = (function () {
    function Laser(xPos, yPos, direction, gamefield) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.direction = direction;
        this.gamefield = gamefield;
        this._won = false;
        this.circle = new createjs.Shape();
        this.circle.graphics.beginFill("red").drawCircle(0, 0, 50);
        this.history = Array(new Point(xPos, yPos));
    }
    Laser.prototype.render = function (stage) {
        var r = FIELD_SIZE / 2;
        var circle = new createjs.Shape();
        var point;
        for (var _i = 0, _a = this.history; _i < _a.length; _i++) {
            point = _a[_i];
            circle.graphics.beginFill("red").drawCircle(point.x * FIELD_SIZE + r, point.y * FIELD_SIZE + r, r / 4);
            stage.addChild(circle);
        }
    };
    Laser.prototype.move = function () {
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
    };
    Object.defineProperty(Laser.prototype, "won", {
        get: function () {
            return this._won;
        },
        enumerable: true,
        configurable: true
    });
    return Laser;
}());
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(xPos, yPos, alignment) {
        _super.call(this, xPos, yPos, 1, 1);
        this.alignment = alignment;
    }
    Block.prototype.getBitmapString = function () {
        return "mirror.png";
    };
    return Block;
}(GameElement));
var BlockAlignment;
(function (BlockAlignment) {
    BlockAlignment[BlockAlignment["HORIZONTAL"] = 0] = "HORIZONTAL";
    BlockAlignment[BlockAlignment["VERTICAL"] = 1] = "VERTICAL";
})(BlockAlignment || (BlockAlignment = {}));
//# sourceMappingURL=core.js.map