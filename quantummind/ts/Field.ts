/**
 * Created by Dominik on 10.05.2016.
 */

class Field {
    field: GameElement[][];

    constructor(public width:number, public height:number) {
        this.field = new Array[width][height];
    }
}