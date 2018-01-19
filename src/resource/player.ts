import {GameObject, GameObjectType} from "../gameObject";
import {Screen} from "../screen";

export class Player implements GameObject{
    constructor(public x:number,public  y:number){

    }

    update(){
    }
    draw(screen:Screen){
        screen.beginFill(0xff0000);
        screen.lineStyle(0);
        screen.drawCircle(this.x, this.y, 54, "main");
    }
    getType(){
        return GameObjectType.Block;
    }
}