import {State} from "./state";
import {Game} from "./game";
import {Block} from "./block";
import {NoneState} from "./noneState";
import {Screen} from "./screen";
import {GameObject, GameObjectType} from "./gameObject";

export class TopDownMoveBlock implements GameObject{
    constructor(
        public startX:number,
        public startY:number,
        public goalX:number,
        public goalY:number,
        public w:number,
        public h:number) {
    }
    update() {
    }

    draw(screen: Screen) {
        screen.endFill();
        screen.lineStyle(0, 0x00ffff);
        screen.beginFill( 0x00ffff, 0.4);
        screen.drawRect(this.startX, this.startY, this.w, this.h, "main");
        screen.beginFill( 0x00ffff, 0.3);
        screen.drawRect(this.goalX, this.goalY, this.w, this.h, "main");
        screen.beginFill( 0x00ffff, 0.4);
        screen.moveTo(this.startX, this.startY);
        screen.lineTo(this.goalX, this.goalY, "main");
    }

    getType(): GameObjectType {
        return GameObjectType.MoveBlock;
    }
}

export class TopDownMoveBlockChangeState implements State{
    target:TopDownMoveBlock;
    pinX:number;
    pinY:number;


    constructor(public game:Game){
        this.target.startX = this.game.input.layerMouseX("main")!;
        this.target.startY = this.game.input.layerMouseY("main")!;
        this.target.goalX = this.target.startX;
        this.target.goalY = this.target.startY;
        this.target.w = 0;
        this.target.h = 0;
        this.pinX = this.target.startX;
        this.pinY = this.target.startY;
    }
    start() {
    }

    state:"resize"|"goal";
    update() {
        if(this.state == "resize" && this.game.input.isLeftClick){
            const pos = Block.gridMatch(this.game, this.game.input.layerMouseX("main")!,this.game.input.layerMouseY("main")!);
            this.target.w = Math.abs(pos.x - this.pinX);
            this.target.h = Math.abs(pos.y - this.pinY);
            this.target.startX = Math.min(pos.x, this.pinX);
            this.target.startY = Math.min(pos.y, this.pinY);
        }
        if(this.state == "resize" && !this.game.input.isLeftClick){
            this.state = "goal";
        }
        if(this.state == "goal" && this.game.input.isFirstLeftClick()) {
            const pos = Block.gridMatch(this.game, this.game.input.layerMouseX("main")!,this.game.input.layerMouseY("main")!);
            this.target.goalX = pos.x;
            this.target.goalY = pos.y;
        }
        if(this.state == "goal" && !this.game.input.isLeftClick){
            this.game.changeState(new NoneState());
        }
    }

    draw() {
    }

    end() {
    }

}
