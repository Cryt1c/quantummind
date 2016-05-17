/**
 * Created by Dominik on 10.05.2016.
 */
class Field {
    field:GameElement[][];
    private _source:Emitter;
    constructor(public width:number, public height:number) {
        this.field = [];
        for (var i:number = 0; i < this.width; i++) {
            this.field[i] = [];
            for (var j:number = 0; j < this.height; j++) {
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

    get source():Emitter {
        return this._source;
    }
    setSource(xPos:number, yPos:number, emitter:Emitter) {
        this.field[xPos][yPos] = emitter;
        this._source = emitter;
    }
}