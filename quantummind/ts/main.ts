/// <reference path="../definitelyTyped/easeljs.d.ts" />
/// <reference path="../definitelyTyped/jquery.d.ts" />
/// <reference path="../definitelyTyped/preloadjs.d.ts" />

import Ticker = createjs.Ticker;

const FIELD_SIZE = 40;

function init() {
    document.onkeydown = keyPressed;
    var stage = new createjs.Stage("demoCanvas");
    createjs.Ticker.addEventListener("tick", handleTick);

    var gamefield = new Field(3, 3);

    var source = new Source(0, 2, Direction.East);
    gamefield.field[0][2] = source;
    gamefield.field[2][2] = new Mirror(2, 2, Alignment.BOTTOM_LEFT_TO_TOP_RIGHT);
    gamefield.field[2][0] = new Detector(2, 0, Direction.South);

    var laser = new Laser(source.xPos, source.yPos, source.direction);

    function handleTick(event) {
        if (!createjs.Ticker.paused) {
            gamefield.render(stage);
            laser.render(stage);
            stage.update();
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
    }
}