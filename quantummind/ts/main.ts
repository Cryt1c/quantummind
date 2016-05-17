/// <reference path="../definitelyTyped/easeljs.d.ts" />
/// <reference path="../definitelyTyped/jquery.d.ts" />
/// <reference path="../definitelyTyped/preloadjs.d.ts" />

import Ticker = createjs.Ticker;

const FIELD_SIZE = 50;
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
                    //console.log("won");
                    createjs.Ticker.paused = true;
                }
                else if (laser.gameOver) {
                    //console.log("gameover");
                    createjs.Ticker.paused = true;
                    label.text = "Gameover! Press 'r' to restart the leve";
                    stage.update();
                }
            }
        }
    }

    function keyPressed(event) {
        //console.log(event.keyCode);
        switch (event.keyCode) {
            case 80:
                if( laser.won ){
                    createLevel(++currentLevel);
                }
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
                createLevel(currentLevel);
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
                stage.update();
                break;
        }
    }

    function createLevel(level:number) {
        var gamefield;
        var instructions;
        stage.removeAllChildren();
        stage.removeAllEventListeners();
        switch (level) {
            case 1:
                gamefield = new Field(3, 1);
                var source = new Emitter(stage, 0, 0, Direction.East);
                gamefield.setSource(0, 0, source);
                gamefield.field[2][0] = new Detector(stage, 2, 0);
                laser = new Laser(gamefield);
                label.text = "In this game you have to direct a laser from the emitter (on the left) to the detector (on the right)." +
                    "\nPress 'p' to start the game.";
                break;

            case 2:
                gamefield = new Field(3, 3);
                var source = new Emitter(stage, 0, 0, Direction.East);
                gamefield.setSource(0, 0, source);
                gamefield.add(new Mirror(stage, 2, 0, 0));
                gamefield.add(new Detector(stage, 2, 2));
                laser = new Laser(gamefield);
                label.text = "A mirror (the blue bar on the top right) reflects the laser.";
                break;

            case 3:
                gamefield = new Field(3, 3);
                var source = new Emitter(stage, 0, 0, Direction.East);
                gamefield.setSource(0, 0, source);
                gamefield.add(new Mirror(stage, 2, 0, 1));
                gamefield.add(new Detector(stage, 2, 2));
                laser = new Laser(gamefield);
                label.text = "Click on the mirror to rotate it.";
                break;

            case 4:
                gamefield = new Field(4, 6);
                var source = new Emitter(stage, 0, 0, Direction.East);
                gamefield.setSource(0, 0, source);
                gamefield.add(new Mirror(stage, 3, 3, 1));
                gamefield.add(new Mirror(stage, 3, 2, 0));
                gamefield.add(new Mirror(stage, 1, 2, 1));
                gamefield.add(new Detector(stage, 1, 5));
                laser = new Laser(gamefield);
                label.text = "Click on the mirror to rotate it.";
                break;
        }

        gamefield.render(stage);

        var border = new createjs.Shape();
        border.graphics.beginStroke("black");
        border.graphics.setStrokeStyle(2);
        border.snapToPixel = true;
        var xLength = gamefield.field.length * FIELD_SIZE;
        var yLength= gamefield.field[0].length * FIELD_SIZE;
        border.graphics.drawRect(0, 0, xLength, yLength);
        stage.addChild(border);

        label.y = gamefield.height * FIELD_SIZE + 10;
        stage.addChild(label);

        stage.addEventListener("stagemousedown", handleClick);

        function handleClick(event){

            console.log('x',event.stageX);
            console.log('y',event.stageY);

            console.log( gamefield.getElement( event.stageX, event.stageY ) );

            var elem = gamefield.getElement( event.stageX, event.stageY );

            if( elem instanceof Mirror ){
                elem.rotateMirror();
            }

            /*
            var counter = 0;
            for(var i=0;i<gamefield.field.length;i++){
                for(var j=0;j<gamefield.field[i].length;j++){
                    if( gamefield.field[i][j] instanceof Mirror ){

                        counter++;

                        console.log('rotating' + counter + 'mirrors');
                        gamefield.field[i][j].rotateMirror();
                    }
                }
            }*/
        }

    }

}

