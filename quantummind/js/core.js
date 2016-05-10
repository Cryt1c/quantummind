var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../definitelyTyped/easeljs.d.ts" />
/// <reference path="../definitelyTyped/jquery.d.ts" />
/// <reference path="../definitelyTyped/preloadjs.d.ts" />
var Ticker = createjs.Ticker;
function init() {
    document.onkeydown = keyPressed;
    /*
     var circle = new createjs.Shape();

     var frames = "" + createjs.Ticker.framerate;
     var text = new createjs.Text(frames, "20px Arial", "#ff7700");
     circle.graphics.beginFill("red").drawCircle(0, 0, 50);
     circle.x = 100;
     circle.y = 100;
     stage.addChild(text);
     stage.addChild(circle);
     stage.addChild(new createjs.Shape()).set({x: 100, y: 100}).graphics.f("red").dc(0, 0, 50);*/
    var stage = new createjs.Stage("demoCanvas");
    createjs.Ticker.addEventListener("tick", handleTick);
    var gamefield = new Field(3, 3);
    for (var i = 0; i < gamefield.width; i++) {
        for (var j = 0; j < gamefield.height; j++) {
        }
    }
    gamefield.field[0][2] = new Source(0, 2, Direction.East);
    gamefield.field[2][2] = new Mirror(2, 2, Alignment.BOTTOM_LEFT_TO_TOP_RIGHT);
    gamefield.field[2][0] = new Detector(2, 0, Direction.South);
}
function handleTick(event) {
    if (!createjs.Ticker.paused) {
        stage.update();
    }
}
function keyPressed(event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
        case 'p':
            createjs.Ticker.paused = !createjs.Ticker.paused;
            break;
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
/**
 * Created by Dominik on 10.05.2016.
 */
var GameElement = (function () {
    function GameElement(xPos, yPos, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }
    ;
    GameElement.prototype.render = function (stage) { };
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
        this.field = new Array[width][height];
    }
    return Field;
}());
//# sourceMappingURL=core.js.map