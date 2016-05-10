/**
 * Created by Dominik on 10.05.2016.
 */

class Field {
    field:GameElement[][];

    constructor(public width:number, public height:number) {
        this.field = new Array[width][height];
    }

    render(stage:Stage) {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                this.field[i][j].render(stage);
            }
        }
    }
}