import Stage = createjs.Stage;
import Bitmap = createjs.Bitmap;
/**
 * Created by Dominik on 10.05.2016.
 */

abstract class GameElement {
    bitmap: Bitmap;
    orientation: number = 0;
    constructor(public stage:createjs.Stage, public xPos:number, public yPos:number, public width:number, public height:number) {
    };

    initBitmap(bitmapPath: string) {
        var image = QUEUE.getResult(bitmapPath);
        this.bitmap = new createjs.Bitmap(image);
        this.bitmap = new createjs.Bitmap("assets/" + bitmapPath);
        var img = this.bitmap.image;
        // console.log("before: " + this.bitmap.scaleX + " " + img.width);
        this.bitmap.scaleX = FIELD_SIZE / img.width;
        this.bitmap.scaleY = FIELD_SIZE / img.height;
        // console.log("after: " + this.bitmap.scaleX + " " + img.width);
        this.stage.addChild(this.bitmap);
    }

    rotate( orientation:number, bitmaps: string[] ) {

        this.bitmap = new createjs.Bitmap("assets/" + bitmaps[orientation]);
        this.orientation = orientation;

        var img = this.bitmap.image;
        this.bitmap.scaleX = FIELD_SIZE / img.width;
        this.bitmap.scaleY = FIELD_SIZE / img.height;
        
    }

    render(stage:Stage) {
        this.bitmap.x = this.xPos * FIELD_SIZE;
        this.bitmap.y = this.yPos * FIELD_SIZE;
        // if (this instanceof Mirror) {
        //     console.log(this.bitmap.x + " " + this.bitmap.y + " " + this.bitmap.regY);
        // }
    };

}