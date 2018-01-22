import {State} from "./state";
import {Game} from "./game";
import {Block} from "./block";
import {NoneState} from "./noneState";
import {Screen} from "./screen";
import {GameObject, GameObjectType} from "./gameObject";

export class MoveBlock implements GameObject{
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
        screen.lineStyle(1, 0x00ffff);
        screen.beginFill( 0x00ffff, 0.6);
        screen.drawRect(this.startX, this.startY, this.w, this.h, "main");
        screen.beginFill( 0x00ffff, 0.6);
        screen.drawRect(this.goalX, this.goalY, this.w, this.h, "main");
        screen.moveTo(this.startX + this.w / 2, this.startY + this.h / 2, "main");
        screen.lineTo(this.goalX + this.w / 2, this.goalY + this.h / 2, "main");
    }

    getType(){
        return "moveblock";
    }

    toSaveData(){
        return {
            type: "moveblock",
            startX: this.startX / 9,
            startY: this.startY / 18,
            goalX: this.goalX / 9,
            goalY: this.goalY / 18,
            w: this.w / 9,
            h: this.h / 18};
    }
}

export class MoveBlockChangeState implements State{
    target:MoveBlock;
    pinX:number;
    pinY:number;


    constructor(public game:Game){
        const pos = Block.gridMatch(this.game, this.game.input.layerMouseX("main")!,this.game.input.layerMouseY("main")!);
        this.target = new MoveBlock(
            pos.x,
            pos.y,
            pos.x,
            pos.y,
            0,
            0);
        this.game.objectList.push(this.target);
        this.pinX = this.target.startX;
        this.pinY = this.target.startY;
    }
    start() {
    }

    state:"resize"|"goal" = "resize";

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
        if(this.state == "goal") {
            const pos = Block.gridMatch(this.game, this.game.input.layerMouseX("main")!,this.game.input.layerMouseY("main")!);
            this.target.goalX = pos.x;
            this.target.goalY = pos.y;
        }
        if(this.state == "goal" && this.game.input.isFirstLeftClick()) {
            this.game.changeState(new NoneState());
        }
    }

    draw() {
    }

    end() {
    }
}
