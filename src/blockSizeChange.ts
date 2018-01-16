import {Game} from "./game";
import {Block} from "./block";
import {State} from "./state";
import {NoneState} from "./noneState";
import Graphics = PIXI.Graphics;

export class BlockSizeChange implements State{

    targetBlock:Block;
    pinPos = {x: 0, y: 0};
    constructor(public game:Game, targetBlock:Block|null){
        if(!targetBlock){
            const pos = Block.gridMatch(this.game, this.game.input.layerMouseX("main")!, this.game.input.layerMouseY("main")!);
            this.targetBlock = new Block(pos.x, pos.y, 0, 0);
            this.game.blockList.push(this.targetBlock);
        }
        this.pinPos = {x: this.targetBlock.x, y: this.targetBlock.y};
    }
    start(){

    }
    update(){
        const pos = Block.gridMatch(this.game, this.game.input.layerMouseX("main")!,this.game.input.layerMouseY("main")!);
        this.targetBlock.w = Math.abs(pos.x - this.pinPos.x);
        this.targetBlock.h = Math.abs(pos.y - this.pinPos.y);
        this.targetBlock.x = Math.min(pos.x, this.pinPos.x);
        this.targetBlock.y = Math.min(pos.y, this.pinPos.y);
        if(!this.game.input.isLeftClick){
            this.game.changeState(new NoneState());
        }
    }
    draw(){

    }
    end(){
        if(
            this.targetBlock.w <= 0 ||
            this.targetBlock.h <= 0){
            this.game.blockList = this.game.blockList.filter((e)=>{
                return this.targetBlock != e;
            });
        }
    }
}