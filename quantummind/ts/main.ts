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

    QUEUE.loadFile({id: "detector", src: "./assets/detector.png"});
    QUEUE.loadFile({id: "mirror", src: "./assets/mirror.png"});
    QUEUE.loadFile({id: "mirror2", src: "./assets/mirror2.png"});
    QUEUE.loadFile({id: "emitter", src: "./assets/emitter.png"});
    QUEUE.on("complete", startGame);


    function startGame() {
        var gamefield = initLevel();
        var laser = new Laser(gamefield);
        gamefield.render(stage);
        createjs.Ticker.addEventListener("tick", handleTick);

        function handleTick(event) {
            if (!createjs.Ticker.paused) {
                laser.move();
                laser.render(stage);
                stage.update();
                if(laser.won) {
                    createjs.Ticker.paused = true;
                    console.log("won");
                }
            }
        }
    }

    function initLevel(): Field {
        var gamefield = new Field(3, 3);
        // var source = new Emitter(0, 2, Direction.East);
        gamefield.setSource(0, 2, new Emitter(0, 2, Direction.East));
        gamefield.field[2][2] = new Mirror(2, 2, Alignment.BOTTOM_LEFT_TO_TOP_RIGHT);
        gamefield.field[2][0] = new Detector(2, 0, Direction.North);
        gamefield.field[2][1] = new Mirror(2, 1, Alignment.TOP_LEFT_TO_BOTTOM_RIGHT);
        return gamefield;
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

