/// <reference path="../definitelyTyped/easeljs.d.ts" />
/// <reference path="../definitelyTyped/jquery.d.ts" />
/// <reference path="../definitelyTyped/preloadjs.d.ts" />

import Ticker = createjs.Ticker;

const FIELD_SIZE = 40;
const STEP_SIZE = 0.1;
const QUEUE = new createjs.LoadQueue(false);

function init() {
    document.onkeydown = keyPressed;
    var stage = new createjs.Stage("demoCanvas");
    var laser;
    var label = new createjs.Text("Press 'p' to start or pause the game.", "20px Arial", "#000000");
    var currentLevel = 1;
    var blinkShape = new createjs.Shape();
    blinkShape.graphics.beginFill("black").drawRect(0, 0, 500, 500);


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
        createLevel(currentLevel);
        createjs.Ticker.paused = true;
        createjs.Ticker.addEventListener("tick", handleTick);

        function handleTick(event) {
            if (!createjs.Ticker.paused) {
                laser.move();
                laser.render(stage);
                stage.update();
                if (laser.won) {
                    console.log("won");
                    createjs.Ticker.paused = true;
                    createLevel(++currentLevel);
                }
                else if (laser.gameOver) {
                    console.log("gameover");
                    createjs.Ticker.paused = true;
                    label.text = "Gameover! Press 'r' to restart the game";
                    stage.update();
                }
            }
        }
    }

    function keyPressed(event) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 80:
                stage.update();
                createjs.Ticker.paused = !createjs.Ticker.paused;
                console.log("pause");
                break;
            case 83:
                stage.update();
                console.log("start");
                break;
            case 82:
                stage.removeAllChildren();
                laser.blink = false;
                createLevel(1);
                stage.update();
                console.log("reset");
                break;
            case 32:
                laser.blink = !laser.blink;
                if(laser.blink) {
                    stage.addChild(blinkShape);
                }
                else {
                    stage.removeChild(blinkShape);
                }
                break;
        }
    }

    function createLevel(level:number) {
        var gamefield;
        var instructions;
        if (1 == level) {
            gamefield = new Field(3, 1);

        var source = new Emitter(stage, 0, 0, Direction.East);
        gamefield.setSource(0, 0, source);
        gamefield.field[2][0] = new Detector(stage, 2, 0, Direction.East);
        gamefield.field[1][0] = new Block(stage, 1, 0, BlockAlignment.VERTICAL);
        laser = new Laser(gamefield);
        label.text = "Press 'p' to start or pause the game.";
    }

        gamefield.render(stage);
        label.y = gamefield.height * FIELD_SIZE + 10;
        stage.addChild(label);

    }

}

