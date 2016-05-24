var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../definitelyTyped/easeljs.d.ts" />
/// <reference path="../definitelyTyped/jquery.d.ts" />
/// <reference path="../definitelyTyped/preloadjs.d.ts" />
var Ticker = createjs.Ticker;
var FIELD_SIZE = 50;
var STEP_SIZE = 10;
var QUEUE = new createjs.LoadQueue(false);
var stage;
var laser;
var label;
var pauseLabel;
var currentLevel = 1;
var gamefield;
function init() {
    document.onkeydown = keyPressed;
    stage = new createjs.Stage("demoCanvas");
    label = new createjs.Text("Press 'p' to start or pause the game.", "20px Arial", "#000000");
    pauseLabel = new createjs.Text("The game is paused! Press 'p' to continue!", "20px Arial", "#ff0000");
    var blinkShape = new createjs.Shape();
    QUEUE.loadFile({ id: "detector", src: "./assets/detector.png" });
    QUEUE.loadFile({ id: "mirror", src: "./assets/mirror.png" });
    QUEUE.loadFile({ id: "mirror2", src: "./assets/mirror2.png" });
    QUEUE.loadFile({ id: "emitter", src: "./assets/emitter.png" });
    QUEUE.loadFile({ id: "emitter2", src: "./assets/emitter2.png" });
    QUEUE.loadFile({ id: "block", src: "./assets/block.png" });
    QUEUE.loadFile({ id: "pause", src: "./assets/pause.png" });
    QUEUE.on("complete", startGame);
    function startGame() {
        label.lineWidth = 500;
        stage.addChild(label);
        stage.update();
        stage.addEventListener("pressup", handleClick);
        function handleClick(event) {
            console.log('click happened');
            if (!createjs.Ticker.paused) {
                var elem = gamefield.getElement(event.stageX, event.stageY);
                if (elem instanceof Mirror) {
                    elem.rotateMirror();
                }
            }
        }
        createLevel(currentLevel);
        pauseGame(true);
        createjs.Ticker.addEventListener("tick", handleTick);
        function handleTick(event) {
            if (!createjs.Ticker.paused) {
                laser.move();
                laser.render(stage);
                stage.update();
                if (laser.won) {
                    //console.log("won");
                    pauseGame(true);
                    continueToNextLevel();
                }
                else if (laser.gameOver) {
                    //console.log("gameover");
                    pauseGame(true);
                    label.text = "Game over! Press 'r' to restart the level.";
                    stage.update();
                }
            }
        }
    }
    function keyPressed(event) {
        //console.log(event.keyCode);
        switch (event.keyCode) {
            case 80:
                pauseGame(!createjs.Ticker.paused);
                stage.update();
                break;
            case 83:
                stage.update();
                console.log("start");
                break;
            case 82:
                laser.blink = false;
                pauseGame(true);
                createLevel(currentLevel);
                stage.update();
                console.log("reset");
                break;
            case 32:
                if (!createjs.Ticker.paused) {
                    laser.blink = !laser.blink;
                    blinkShape.graphics.clear();
                    blinkShape.graphics.beginFill("black").drawRect(0, 0, gamefield.lengthX() * FIELD_SIZE, gamefield.lengthY() * FIELD_SIZE);
                    if (laser.blink) {
                        stage.addChild(blinkShape);
                    }
                    else {
                        stage.removeChild(blinkShape);
                    }
                    stage.update();
                }
                break;
        }
    }
}
function createLevel(level) {
    stage.removeAllChildren();
    switch (level) {
        case 1:
            gamefield = new Field(6, 1);
            var source = new Emitter(stage, 0, 0, Direction.East, 0);
            gamefield.setSource(source);
            gamefield.add(new Detector(stage, 5, 0));
            laser = new Laser(gamefield);
            label.text = "In this game you have to direct a laser from the emitter (on the left) to the detector (on the right)." +
                " You cannot direct the laser itself but you can manipulate other objects to redirect lasers.";
            break;
        case 2:
            gamefield = new Field(9, 3);
            var source = new Emitter(stage, 0, 0, Direction.East, 0);
            gamefield.setSource(source);
            gamefield.add(new Mirror(stage, 8, 0, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Detector(stage, 8, 2));
            laser = new Laser(gamefield);
            label.text = "Mirrors (the blue bar on the top right) reflect the laser.";
            break;
        case 3:
            gamefield = new Field(9, 3);
            var source = new Emitter(stage, 0, 0, Direction.East, 0);
            gamefield.setSource(source);
            gamefield.add(new Mirror(stage, 8, 0, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Detector(stage, 8, 2));
            laser = new Laser(gamefield);
            label.text = "Click on mirrors to rotate them. Mirrors cannot be rotated while the game is paused.";
            break;
        case 4:
            gamefield = new Field(9, 6);
            var source = new Emitter(stage, 0, 0, Direction.East, 0);
            gamefield.setSource(source);
            gamefield.add(new Mirror(stage, 8, 0, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 2, 2, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 8, 2, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Detector(stage, 2, 5));
            laser = new Laser(gamefield);
            label.text = "Click on mirrors to rotate them. Mirrors cannot be rotated while the game is paused.";
            break;
        case 5:
            gamefield = new Field(9, 9);
            var source = new Emitter(stage, 0, 4, Direction.East, 0);
            gamefield.setSource(source);
            gamefield.add(new Mirror(stage, 4, 4, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 4, 0, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 8, 0, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 4, 8, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 8, 8, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Block(stage, 6, 0));
            gamefield.add(new Detector(stage, 8, 4));
            laser = new Laser(gamefield);
            label.text = "Blocks (Gandalf on the top ;) ) hinder the path of the laser. Try to go around blocks.";
            break;
        case 6:
            gamefield = new Field(9, 5);
            var source = new Emitter(stage, 0, 0, Direction.East, 0);
            gamefield.setSource(source);
            gamefield.add(new Mirror(stage, 3, 0, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 0, 2, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 8, 2, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 0, 4, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 3, 4, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Block(stage, 6, 4));
            gamefield.add(new Detector(stage, 8, 4));
            laser = new Laser(gamefield);
            label.text = "Blocks hinder the path of the laser. Try to go around blocks.";
            break;
        case 7:
            gamefield = new Field(9, 3);
            var source = new Emitter(stage, 0, 1, Direction.East, 0);
            gamefield.setSource(source);
            gamefield.add(new Block(stage, 4, 1));
            gamefield.add(new Detector(stage, 8, 1));
            laser = new Laser(gamefield);
            label.text = "Tunnel effect! You can pass trough blocks by switching to wave mode (press 'space'). " +
                "But remember to switch back again! Otherwise the laser will also pass through the mirrors and the detector.";
            break;
        case 8:
            gamefield = new Field(9, 6);
            var source = new Emitter(stage, 0, 0, Direction.East, 0);
            gamefield.setSource(source);
            gamefield.add(new Mirror(stage, 2, 0, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 4, 0, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 1, 1, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 3, 1, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 5, 0, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 0, 2, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Block(stage, 2, 4));
            gamefield.add(new Mirror(stage, 2, 2, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 4, 2, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 6, 2, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 0, 3, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 2, 3, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 4, 3, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Block(stage, 4, 5));
            gamefield.add(new Mirror(stage, 7, 3, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 1, 4, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 4, 4, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 2, 5, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 6, 5, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Detector(stage, 6, 4));
            laser = new Laser(gamefield);
            label.text = "You are now on your own - go for the Lasorz!!";
            break;
        case 9:
            gamefield = new Field(9, 6);
            var source = new Emitter(stage, 4, 0, Direction.South, 1);
            gamefield.setSource(source);
            gamefield.add(new Mirror(stage, 2, 0, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Block(stage, 4, 1));
            gamefield.add(new Block(stage, 4, 2));
            gamefield.add(new Block(stage, 4, 3));
            gamefield.add(new Mirror(stage, 4, 5, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Block(stage, 3, 5));
            gamefield.add(new Mirror(stage, 2, 5, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 2, 2, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 7, 2, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 7, 5, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 8, 5, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 8, 3, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Detector(stage, 0, 3));
            laser = new Laser(gamefield);
            label.text = "You are now on your own - go for the Lasorz!!";
            break;
        case 10:
            gamefield = new Field(6, 1);
            var source = new Emitter(stage, 0, 0, Direction.East, 0);
            gamefield.setSource(source);
            laser = new Laser(gamefield);
            label.text = "The Fridge is a lie ;)";
            break;
    }
    label.text += "\nPress 'p' to start or pause the game.";
    gamefield.render(stage);
    var border = new createjs.Shape();
    border.graphics.beginStroke("black");
    border.graphics.setStrokeStyle(2);
    border.snapToPixel = true;
    var xLength = gamefield.field.length * FIELD_SIZE;
    var yLength = gamefield.field[0].length * FIELD_SIZE;
    border.graphics.drawRect(0, 0, xLength, yLength);
    stage.addChild(border);
    label.y = gamefield.height * FIELD_SIZE + 10;
    pauseLabel.y = label.y + 100;
    stage.addChild(label);
    stage.addChild(pauseLabel);
    stage.update();
}
function continueToNextLevel() {
    createLevel(++currentLevel);
    stage.update();
}
function pauseGame(paused) {
    createjs.Ticker.paused = paused;
    pauseLabel.visible = paused;
    stage.update();
}
var Direction;
(function (Direction) {
    Direction[Direction["North"] = 0] = "North";
    Direction[Direction["East"] = 1] = "East";
    Direction[Direction["South"] = 2] = "South";
    Direction[Direction["West"] = 3] = "West";
})(Direction || (Direction = {}));
var Stage = createjs.Stage;
var Bitmap = createjs.Bitmap;
var GameElement = (function () {
    function GameElement(stage, xPos, yPos, width, height) {
        this.stage = stage;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.orientation = 0;
    }
    ;
    GameElement.prototype.initBitmap = function (bitmapPath) {
        var image = QUEUE.getResult(bitmapPath);
        this.bitmap = new createjs.Bitmap(image);
        var img = this.bitmap.image;
        // console.log("before: " + this.bitmap.scaleX + " " + img.width);
        this.bitmap.scaleX = FIELD_SIZE / img.width;
        this.bitmap.scaleY = FIELD_SIZE / img.height;
        // console.log("after: " + this.bitmap.scaleX + " " + img.width);
        this.stage.addChild(this.bitmap);
    };
    GameElement.prototype.rotate = function (orientation, bitmaps) {
        this.stage.removeChild(this.bitmap);
        this.orientation = orientation;
        var image = QUEUE.getResult(bitmaps[orientation]);
        this.bitmap = new createjs.Bitmap(image);
        var img = this.bitmap.image;
        this.bitmap.scaleX = FIELD_SIZE / img.width;
        this.bitmap.scaleY = FIELD_SIZE / img.height;
        this.stage.addChild(this.bitmap); /*.addEventListener('stagemousedown',function(event){
            console.log('mousedown',event.target);*/
        //});
        this.render(this.stage);
        this.stage.update();
    };
    GameElement.prototype.render = function (stage) {
        this.bitmap.x = this.xPos * FIELD_SIZE;
        this.bitmap.y = this.yPos * FIELD_SIZE;
        // if (this instanceof Mirror) {
        //     console.log(this.bitmap.x + " " + this.bitmap.y + " " + this.bitmap.regY);
        // }
    };
    ;
    return GameElement;
}());
var Emitter = (function (_super) {
    __extends(Emitter, _super);
    function Emitter(stage, xPos, yPos, direction, orientation) {
        _super.call(this, stage, xPos, yPos, 1, 1);
        this.direction = direction;
        _super.prototype.initBitmap.call(this, "emitter");
        this.orientation = orientation;
        this.rotateEmitter();
    }
    Emitter.prototype.rotateEmitter = function () {
        // TODO: Extend for other directions and merge direction and orientation
        var rotateArr = ["emitter", "emitter2"];
        _super.prototype.rotate.call(this, this.orientation, rotateArr);
    };
    return Emitter;
}(GameElement));
var Detector = (function (_super) {
    __extends(Detector, _super);
    function Detector(stage, xPos, yPos) {
        _super.call(this, stage, xPos, yPos, 1, 1);
        _super.prototype.initBitmap.call(this, "detector");
    }
    return Detector;
}(GameElement));
var Mirror = (function (_super) {
    __extends(Mirror, _super);
    function Mirror(stage, xPos, yPos, orientation) {
        _super.call(this, stage, xPos, yPos, 1, 1);
        this.orientation = orientation;
        if (this.orientation === 0) {
            _super.prototype.initBitmap.call(this, "mirror");
        }
        else {
            _super.prototype.initBitmap.call(this, "mirror2");
        }
    }
    Mirror.prototype.rotateMirror = function () {
        var rotateArr = ["mirror", "mirror2"];
        if (this.orientation == 0) {
            this.orientation = 1;
            _super.prototype.rotate.call(this, this.orientation, rotateArr);
        }
        else {
            this.orientation = 0;
            _super.prototype.rotate.call(this, this.orientation, rotateArr);
        }
    };
    return Mirror;
}(GameElement));
var MirrorOrientation;
(function (MirrorOrientation) {
    MirrorOrientation[MirrorOrientation["TOP_LEFT_TO_BOTTOM_RIGHT"] = 0] = "TOP_LEFT_TO_BOTTOM_RIGHT";
    MirrorOrientation[MirrorOrientation["BOTTOM_LEFT_TO_TOP_RIGHT"] = 1] = "BOTTOM_LEFT_TO_TOP_RIGHT";
})(MirrorOrientation || (MirrorOrientation = {}));
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
    Field.prototype.add = function (elem) {
        if (elem.xPos < 0 || elem.xPos >= this.width)
            throw "x must be between 0 and " + this.width + ", but was " + elem.xPos;
        if (elem.yPos < 0 || elem.yPos >= this.height)
            throw "y must be between 0 and " + this.height + ", but was " + elem.yPos;
        this.field[elem.xPos][elem.yPos] = elem;
    };
    Field.prototype.getElement = function (x, y) {
        return this.field[Math.floor(x / FIELD_SIZE)][Math.floor(y / FIELD_SIZE)];
    };
    Field.prototype.lengthX = function () {
        return this.field.length;
    };
    Field.prototype.lengthY = function () {
        return this.field[0].length;
    };
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
    Object.defineProperty(Field.prototype, "source", {
        get: function () {
            return this._source;
        },
        enumerable: true,
        configurable: true
    });
    Field.prototype.setSource = function (emitter) {
        this.add(emitter);
        this._source = emitter;
    };
    return Field;
}());
var Shape = createjs.Shape;
var Point = createjs.Point;
var Laser = (function () {
    function Laser(gamefield) {
        this.gamefield = gamefield;
        this._won = false;
        this._gameOver = false;
        this.xPos = gamefield.source.xPos * 100;
        this.yPos = gamefield.source.yPos * 100;
        this.direction = gamefield.source.direction;
        this.circle = new createjs.Shape();
        this.history = Array(new Point(this.xPos, this.yPos));
        this.blink = false;
    }
    Laser.prototype.render = function (stage) {
        if (this.blink)
            return;
        var r = FIELD_SIZE / 2;
        this.circle.graphics.beginFill("red").drawCircle(this.xPos / 100 * FIELD_SIZE + r, this.yPos / 100 * FIELD_SIZE + r, r / 4);
        stage.addChild(this.circle);
        // var circle = new createjs.Shape();
        // var point;
        // for (point of this.history) {
        //
        //     circle.graphics.beginFill("red").drawCircle(point.x * FIELD_SIZE + r, point.y * FIELD_SIZE + r, r / 4);
        //     stage.addChild(circle);
        // }
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
            default:
                // do nothing
                break;
        }
        this.history.push(new Point(this.xPos, this.yPos));
        if (this.blink)
            return;
        //console.log(this.xPos + " " + this.yPos);
        if (Math.abs(this.xPos % 100) < STEP_SIZE && Math.abs(this.yPos % 100) < STEP_SIZE) {
            var x = Math.round(this.xPos / 100);
            var y = Math.round(this.yPos / 100);
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
            }
            else if (currentField instanceof Block) {
                this.direction = null;
                this._gameOver = true;
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
    Object.defineProperty(Laser.prototype, "gameOver", {
        get: function () {
            return this._gameOver;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Laser.prototype, "blink", {
        get: function () {
            return this._blink;
        },
        set: function (value) {
            this._blink = value;
        },
        enumerable: true,
        configurable: true
    });
    return Laser;
}());
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(stage, xPos, yPos) {
        _super.call(this, stage, xPos, yPos, 1, 1);
        _super.prototype.initBitmap.call(this, "block");
    }
    return Block;
}(GameElement));
//# sourceMappingURL=core.js.map