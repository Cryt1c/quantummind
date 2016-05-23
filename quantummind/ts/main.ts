/// <reference path="../definitelyTyped/easeljs.d.ts" />
/// <reference path="../definitelyTyped/jquery.d.ts" />
/// <reference path="../definitelyTyped/preloadjs.d.ts" />

import Ticker = createjs.Ticker;

const FIELD_SIZE = 50;
const STEP_SIZE = 10;
const QUEUE = new createjs.LoadQueue(false);

var stage;
var laser;
var label;
var currentLevel = 1;
var gamefield;

function init() {
    document.onkeydown = keyPressed;
    stage = new createjs.Stage("demoCanvas");
    label = new createjs.Text("Press 'p' to start or pause the game.", "20px Arial", "#000000");
    var blinkShape = new createjs.Shape();

    QUEUE.loadFile({id: "detector", src: "./assets/detector.png"});
    QUEUE.loadFile({id: "mirror", src: "./assets/mirror.png"});
    QUEUE.loadFile({id: "mirror2", src: "./assets/mirror2.png"});
    QUEUE.loadFile({id: "emitter", src: "./assets/emitter.png"});
    QUEUE.loadFile({id: "block", src: "./assets/block.png"});
    QUEUE.on("complete", startGame);

    function startGame() {
        label.lineWidth = 500;
        stage.addChild(label);
        stage.update();

        stage.addEventListener("pressup", handleClick);

        function handleClick(event) {

            console.log('click happened')

            if (!createjs.Ticker.paused) {
                var elem = gamefield.getElement(event.stageX, event.stageY);

                if (elem instanceof Mirror) {
                    elem.rotateMirror();
                }
            }
        }

        createLevel(currentLevel);
        createjs.Ticker.paused = true;
        createjs.Ticker.addEventListener("tick", handleTick);

        function handleTick(event) {
            if (!createjs.Ticker.paused) {
                laser.move();
                laser.render(stage);
                stage.update();
                if (laser.won) {
                    //console.log("won");
                    createjs.Ticker.paused = true;
                    continueToNextLevel();
                }
                else if (laser.gameOver) {
                    //console.log("gameover");
                    createjs.Ticker.paused = true;
                    label.text = "Game over! Press 'r' to restart the level.";
                    stage.update();
                }
            }
        }
    }

    function keyPressed(event) {
        //console.log(event.keyCode);
        switch (event.keyCode) {
            case 80: // 'p'
                createjs.Ticker.paused = !createjs.Ticker.paused;
                console.log("pause");
                break;
            case 83: // 's'
                stage.update();
                console.log("start");
                break;
            case 82: // 'r'
                laser.blink = false;
                createjs.Ticker.paused = true;
                createLevel(currentLevel);
                stage.update();
                console.log("reset");
                break;
            case 32: // space
                if( !createjs.Ticker.paused ){
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

function createLevel(level:number) {
    stage.removeAllChildren();
    switch (level) {
        case 1:
            gamefield = new Field(6, 1);
            var source = new Emitter(stage, 0, 0, Direction.East);
            gamefield.setSource(source);
            gamefield.add(new Detector(stage, 5, 0));
            laser = new Laser(gamefield);
            label.text = "In this game you have to direct a laser from the emitter (on the left) to the detector (on the right)." +
                " You cannot direct the laser itself but you can manipulate other objects to redirect lasers.";
            break;

        case 2:
            gamefield = new Field(9, 3);
            var source = new Emitter(stage, 0, 0, Direction.East);
            gamefield.setSource(source);
            gamefield.add(new Mirror(stage, 8, 0, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Detector(stage, 8, 2));
            laser = new Laser(gamefield);
            label.text = "Mirrors (the blue bar on the top right) reflect the laser.";
            break;

        case 3:
            gamefield = new Field(9, 3);
            var source = new Emitter(stage, 0, 0, Direction.East);
            gamefield.setSource(source);
            gamefield.add(new Mirror(stage, 8, 0, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Detector(stage, 8, 2));
            laser = new Laser(gamefield);
            label.text = "Click on mirrors to rotate them. Mirrors cannot be rotated while the game is paused.";
            break;

        case 4:
            gamefield = new Field(9, 6);
            var source = new Emitter(stage, 0, 0, Direction.East);
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
            var source = new Emitter(stage, 0, 4, Direction.East);
            gamefield.setSource(source);
            gamefield.add(new Mirror(stage, 4, 4, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 4, 0, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage, 8, 0, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 4, 8, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage, 8, 8, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Block(stage, 6, 0));
            gamefield.add(new Detector(stage, 8, 4));
            laser = new Laser(gamefield);
            label.text = "Blocks hinder the path of the laser. Try to go around blocks.";
            break;

        case 6:
            gamefield = new Field(9, 5);
            var source = new Emitter(stage, 0, 0, Direction.East);
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
            var source = new Emitter(stage, 0, 1, Direction.East);
            gamefield.setSource(source);
            gamefield.add(new Block(stage, 4, 1));
            gamefield.add(new Detector(stage, 8, 1));
            laser = new Laser(gamefield);
            label.text = "Tunnel effect! You can pass trough blocks by switching to wave mode (press 'space'). " +
                "But remember to switch back again! Otherwise the laser will also pass through the mirrors and the detector.";
            break;

        case 8:
            gamefield = new Field(9,6);
            var source = new Emitter(stage, 0,0, Direction.East);
            gamefield.setSource(source);
            gamefield.add(new Mirror(stage,2,0, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage,4,0, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage,1,1, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage,3,1, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage,5,0, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage,0,2, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Block(stage, 2, 4));
            gamefield.add(new Mirror(stage,2,2, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage,4,2, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage,6,2, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Mirror(stage,0,3, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage,2,3, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage,4,3, MirrorOrientation.TOP_LEFT_TO_BOTTOM_RIGHT));
            gamefield.add(new Block(stage, 4, 5));
            /*gamefield.add(new Block(stage, 5, 4));
            gamefield.add(new Block(stage, 6, 4));*/
            gamefield.add(new Mirror(stage,7,3, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage,1,4, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage,4,4, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage,2,5, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Mirror(stage,6,5, MirrorOrientation.BOTTOM_LEFT_TO_TOP_RIGHT));
            gamefield.add(new Detector(stage, 6,4));
            laser = new Laser(gamefield);
            label.text = "You are now on your own - go for the Lasorz!!";
            break;
    }

    label.text += "\nPress 'p' to start or pause the game."

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
    stage.addChild(label);
    stage.update();
}

function continueToNextLevel() {
    createLevel(++currentLevel);
    stage.update();
}