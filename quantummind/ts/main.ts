/// <reference path="../definitelyTyped/easeljs.d.ts" />
/// <reference path="../definitelyTyped/jquery.d.ts" />
/// <reference path="../definitelyTyped/preloadjs.d.ts" />

import Ticker = createjs.Ticker;

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

    for(var i = 0; i < gamefield.width; i++) {
        for(var j = 0; j < gamefield.height; j++) {
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