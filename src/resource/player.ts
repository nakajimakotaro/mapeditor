import {GameObject, GameObjectType} from "../gameObject";
import {Screen} from "../screen";

export class Player implements GameObject{
    constructor(public x:number,public  y:number){

    }

    update(){
    }
    draw(screen:Screen){
        screen.beginFill(0xff00ff, 0.6);
        screen.lineStyle(1,0xff00ff, 0.6);
        screen.drawCircle(this.x, this.y, 54, "main");
    }
    getType(){
        return "player";
    }

    toSaveData(){
        return {
            x: this.x / 9,
            y: this.y / 18,
            type: "player"
        };
    }
}