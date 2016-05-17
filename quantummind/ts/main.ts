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
    var gamefield = new Field(3, 3);

    var source = new Emitter(0, 2, Direction.East);
    gamefield.field[0][2] = source;
    gamefield.field[2][2] = new Mirror(2, 2, 1);
    gamefield.field[2][0] = new Detector(2, 0, Direction.North);
    gamefield.field[2][1] = new Mirror(2, 1, 0);
    var laser = new Laser(source.xPos, source.yPos, source.direction, gamefield);
    gamefield.render(stage);
    createjs.Ticker.addEventListener("tick", handleTick);
    stage.on('stagemousedown', handleClick);

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

    function handleClick(event) {

        

        for( var i=0;i<gamefield.field.length;i++ ){
            for( var j=0;j<gamefield.field[i].length;j++ ){
                if(gamefield.field[i][j] instanceof Mirror){

                    var rotateArr = [ "mirror.png", "mirror2.png" ];

                    gamefield.field[i][j].rotate( 1, rotateArr );

                    gamefield.render(stage);
                    stage.update();
                }
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

