import Stage = createjs.Stage;
import Bitmap = createjs.Bitmap;

abstract class GameElement {
    bitmap: Bitmap;
    orientation: number = 0;
    constructor(public stage:createjs.Stage, public xPos:number, public yPos:number, public width:number, public height:number) {
    };

    initBitmap(bitmapPath: string) {
        var image = QUEUE.getResult(bitmapPath);
        this.bitmap = new createjs.Bitmap(image);
        var img = this.bitmap.image;
        // console.log("before: " + this.bitmap.scaleX + " " + img.width);
        this.bitmap.scaleX = FIELD_SIZE / img.width;
        this.bitmap.scaleY = FIELD_SIZE / img.height;
        // console.log("after: " + this.bitmap.scaleX + " " + img.width);
        this.stage.addChild(this.bitmap);
    }

    rotate( orientation:number, bitmaps: string[] ) {

        this.stage.removeChild(this.bitmap);

        this.orientation = orientation;

        var image = QUEUE.getResult(bitmaps[orientation]);
        this.bitmap = new createjs.Bitmap(image);
        var img = this.bitmap.image;
        this.bitmap.scaleX = FIELD_SIZE / img.width;
        this.bitmap.scaleY = FIELD_SIZE / img.height;


        this.stage.addChild(this.bitmap);/*.addEventListener('stagemousedown',function(event){
            console.log('mousedown',event.target);*/
        //});
        this.render(this.stage);
        this.stage.update();

    }

    render(stage:Stage) {
        this.bitmap.x = this.xPos * FIELD_SIZE;
        this.bitmap.y = this.yPos * FIELD_SIZE;
        // if (this instanceof Mirror) {
        //     console.log(this.bitmap.x + " " + this.bitmap.y + " " + this.bitmap.regY);
        // }
    };

}