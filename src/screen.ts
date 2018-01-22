import {Layer} from "./layer";
import {Game} from "./game";

export class Screen{
    private game:Game;
    private layerMap = new Map<string, Layer>();
    private graphics = new PIXI.Graphics();
    width:number;
    height:number;
    constructor(game:Game, width: number, height: number){
        this.game = game;
        this.game.app.stage.addChild(this.graphics);

        this.width = width;
        this.height = height;
        this.layerMap.set("ui", new Layer());
        this.layerMap.set("main", new Layer());

    }
    moveLayer(x:number, y:number, layerName:string){
        const layer = this.layerMap.get(layerName);
        if(!layer)return;
        layer.offset.x += x;
        layer.offset.y += y;
    }
    layerOffset(layerName:string):{x:number, y:number}|null{
        const layer = this.layerMap.get(layerName);
        if(!layer)return null;
        return layer.offset;
    }
    beginFill(color: number, alpha: number = 1){
        this.graphics.beginFill(color, alpha);
    }
    endFill(){
        this.graphics.endFill();
    }
    lineStyle(width:number, color: number = 0xffffff, alpha: number = 1){
        this.graphics.lineStyle(width, color, alpha);
    }
    drawRect(x:number, y:number, w:number, h:number, layerName:string){
        const layer = this.layerMap.get(layerName);
        if(!layer)return;
        this.graphics.drawRect(
            x + layer.offset.x,
            y + layer.offset.y,
            w,
            h
        );
    }
    drawCircle(x:number, y:number, r:number, layerName:string){
        const layer = this.layerMap.get(layerName);
        if(!layer)return;
        this.graphics.drawCircle(
            x + layer.offset.x,
            y + layer.offset.y,
            r);
    }
    moveTo(x:number, y:number, layerName:string){
        const layer = this.layerMap.get(layerName);
        if(!layer)return;
        this.graphics.moveTo(
            x + layer.offset.x,
            y + layer.offset.y);
    }
    lineTo(x:number, y:number, layerName:string){
        const layer = this.layerMap.get(layerName);
        if(!layer)return;
        this.graphics.lineTo(
            x + layer.offset.x,
            y + layer.offset.y
        );
    }
    clear(){
        this.graphics.clear();
    }
}