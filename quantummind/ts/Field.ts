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

    add(elem:GameElement) {
        if (elem.xPos < 0 || elem.xPos >= this.width)
            throw "x must be between 0 and " + this.width + ", but was " + elem.xPos;
        if (elem.yPos < 0 || elem.yPos >= this.height)
            throw "y must be between 0 and " + this.height + ", but was " + elem.yPos;
        this.field[elem.xPos][elem.yPos] = elem;
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

    setSource(emitter:Emitter) {
        this.add(emitter);
        this._source = emitter;
    }
}