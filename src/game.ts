import "pixi.js"
import {Block} from "./block";
import {Input} from "./input";
import {State} from "./state";
import {NoneState} from "./noneState";
import {BlockSizeChange} from "./blockSizeChange";
import {Screen} from "./screen";
import {ScrollState} from "./resource/scrollState";
import {GameObjectType} from "./gameObject";
import {Player} from "./resource/player";
import {Storeage} from "./storeage";
import {TopDownMoveBlock, TopDownMoveBlockChangeState} from "./topDownMoveBlock";
export class Game{
    width: 1440 = 1440;
    height: 900 = 900;
    charWidth: 9 = 9;
    charHeight: 18 = 18;

    app:PIXI.Application = new PIXI.Application({width: this.width, height: this.height});
    input:Input = new Input(this, this.app.view);

    blockList:Block[] = [];
    player:Player;
    screen:Screen = new Screen(this, this.width, this.height);
    state:State = new NoneState();
    selectObject: GameObjectType;

    constructor() {
        document.body.appendChild(this.app.view);
        document.getElementById("block")!.addEventListener("click", (e) => {
            this.selectObject = GameObjectType.Block;
            this.changeState(new NoneState());
        });
        document.getElementById("moveblock")!.addEventListener("click", (e) => {
            this.selectObject = GameObjectType.MoveBlock;
            this.changeState(new NoneState());
        });
        document.getElementById("player")!.addEventListener("click", (e) => {
            this.selectObject = GameObjectType.Player;
            this.changeState(new NoneState());
        });
        this.player = new Player(0, 0);
        document.getElementById("saveButton")!.addEventListener("click", (e) => {
            Storeage.save(this);
        });
    }
    loop(){
        this.screen.clear();
        this.update();
        this.draw();
        setTimeout(()=>this.loop(), 16);
    }
    selectState(){
        if(this.input.isPushTrigger("z")){
            if(this.blockList) {
                this.blockList.pop();
                return;
            }
        }
        if(this.input.isPushTrigger("f")){
            this.changeState(new ScrollState(this));
            return;
        }
        if(this.selectObject == GameObjectType.Block){
            if(this.input.isFirstLeftClick()){
                this.changeState(new BlockSizeChange(this, null));
                return;
            }
        }
        if(this.selectObject == GameObjectType.Player){
            if(this.input.isFirstLeftClick()){
                this.player.x = this.input.layerMouseX("main")!;
                this.player.y = this.input.layerMouseY("main")!;
            }
        }
        if(this.selectObject == GameObjectType.MoveBlock){
            if(this.input.isFirstLeftClick()){
                this.changeState(new TopDownMoveBlockChangeState(this));
            }
        }
    }
    update(){
        this.selectState();
        this.state.update();

        this.input.update();
        this.player.update();
        for(let block of this.blockList){
            block.update();
        }
    }
    draw(){
        this.drawGrid();
        this.player.draw(this.screen);
        for(let block of this.blockList){
            block.draw(this.screen);
        }
        this.state.draw();
    }
    changeState(state:State){
        this.state.end();
        this.state = state;
        this.state.start();
    }
    drawGrid(){
        for(let x = 0;x < this.width;x+=this.charWidth){
            this.screen.lineStyle(1, 0xffffff, 0.2);
            this.screen.moveTo(x, 0);
            this.screen.lineTo(x, this.height, "ui");
        }
        for(let y = 0;y < this.height;y+=this.charHeight) {
            this.screen.lineStyle(1, 0xffffff, 0.2);
            this.screen.moveTo(0, y);
            this.screen.lineTo(this.width, y, "ui");
        }
    }
}