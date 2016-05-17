/// <reference path="../definitelyTyped/easeljs.d.ts" />
/// <reference path="../definitelyTyped/jquery.d.ts" />
/// <reference path="../definitelyTyped/preloadjs.d.ts" />

import Ticker = createjs.Ticker;

const FIELD_SIZE = 40;
const STEP_SIZE = 0.1;

function init() {
    document.onkeydown = keyPressed;
    var stage = new createjs.Stage("demoCanvas");
    createjs.Ticker.paused = !createjs.Ticker.paused;
    var laser;
    var label = new createjs.Text("Press 'p' to start or pause the game.", "20px Arial", "#000000");
    label.lineWidth = 500;
    stage.addChild(label);
    stage.update();
    var currentLevel = 1;

    createLevel(currentLevel);

    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick(event) {
        if (!createjs.Ticker.paused) {
            laser.move();
            laser.render(stage);
            stage.update();
            if (laser.won || laser.gameOver) {
                createjs.Ticker.paused = true;
                console.log("won or gameover");
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
                console.log("pause");
                break;
        }
    }

    function createLevel(level:number) {
        var gamefield;
        var instructions;
        if (1 == level) {
            gamefield = new Field(3, 1);

            var source = new Emitter(stage, 0, 0, Direction.East);
            gamefield.field[0][0] = source;
            gamefield.field[2][0] = new Detector(stage, 2, 0, Direction.East);
            laser = new Laser(source.xPos, source.yPos, source.direction, gamefield);
            label.text = "Press 'p' to start or pause the game.";
        }

        gamefield.render(stage);
        label.y = gamefield.height * FIELD_SIZE + 10;
        stage.addChild(label);

    }

}

