import {Game} from "./game";
import {Screen} from "./screen";
import {GameObject, GameObjectType} from "./gameObject";

export class Block implements GameObject{

    constructor(public x:number, public y:number, public w:number, public h:number){
    }

    update(){}
    draw(screen:Screen){
        screen.endFill();
        screen.lineStyle(2, 0x00ff00);
        screen.drawRect(this.x, this.y, this.w, this.h, "main");
    }
    static gridMatch(game:Game, x:number, y:number):{x:number, y:number}{
        const res = {x: 0, y: 0};
        res.x = x - x % game.charWidth;
        res.y = y - y % game.charHeight;
        return res;
    }
    getType(){
        return GameObjectType.Block;
    }
}

