import {GameObject, GameObjectType} from "../gameObject";
import {Screen} from "../screen";

export class Player implements GameObject{
    update(){
    }
    draw(screen:Screen){

    }
    getType(){
        return GameObjectType.Block;
    }
}