import {State} from "../state";
import Graphics = PIXI.Graphics;
import {Game} from "../game";
import {NoneState} from "../noneState";

export class ScrollState implements State{
    prevX:number;
    prevY:number;
    constructor(public game:Game){
        this.prevX = this.game.input.mouseX;
        this.prevY = this.game.input.mouseY;
    }
    start(){}
    update(){
        if(this.game.input.isPush("f")){
            this.game.screen.moveLayer(
                this.game.input.mouseX - this.prevX,
                this.game.input.mouseY - this.prevY,
                "main"
            );
            this.prevX = this.game.input.mouseX;
            this.prevY = this.game.input.mouseY;
        }else{
            this.game.changeState(new NoneState());
        }
    }
    draw(){

    }
    end(){}
}