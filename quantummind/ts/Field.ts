/**
 * Created by Dominik on 10.05.2016.
 */

class Field {
    field:GameElement[][];

    constructor(public width:number, public height:number) {
        for(var i: number = 0; i < this.width; i++) {
            this.field[i] = [];
            for(var j: number = 0; j< this.height; j++) {
                this.field[i][j] = null;
            }
        }
    }

    render(stage:Stage) {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                var elem = this.field[i][j];
                if (elem != null) {
                    elem.render(stage);
                }
            }
        }
    }
}