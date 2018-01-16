import {Game} from "./game";

export class Input{
    private keyMap = new Map<string, number>();
    leftClickCount:number = 0;
    isLeftClick:boolean = false;
    mouseX:number = 0;
    mouseY:number = 0;

    constructor(public game:Game, view:HTMLCanvasElement){
        view.addEventListener("mousemove", (e:MouseEvent)=>{
            this.mouseX = e.clientX - view.getBoundingClientRect().left;
            this.mouseY = e.clientY - view.getBoundingClientRect().top;
        });
        view.addEventListener("mousedown", (e:MouseEvent)=>{
            this.isLeftClick = true;
        });
        view.addEventListener("mouseup", (e:MouseEvent)=> {
            this.isLeftClick = false;
        });
        document.addEventListener("keydown", (e:KeyboardEvent)=>{
            if(!this.keyMap.has(e.key)){
                this.keyMap.set(e.key, 0);
            }
        });
        document.addEventListener("keyup", (e:KeyboardEvent)=>{
            this.keyMap.delete(e.key);
        });
    }
    update(){
        if(this.isLeftClick){
            this.leftClickCount++;
        }else{
            this.leftClickCount = 0;
        }
        for(let [key, value] of this.keyMap){
            this.keyMap.set(key, value + 1);
        }
    }
    isFirstLeftClick():boolean{
        return this.isLeftClick && this.leftClickCount == 0;
    }
    layerMouseX(layerName:string){
        const offset = this.game.screen.layerOffset(layerName);
        if(!offset)return null;
        return this.mouseX - offset.x;
    }
    layerMouseY(layerName:string){
        const offset = this.game.screen.layerOffset(layerName);
        if(!offset)return null;
        return this.mouseY - offset.y;
    }
    isPush(key:string):boolean{
        return this.keyMap.has(key);
    }
    isPushTrigger(key:string):boolean{
        return this.keyMap.get(key) == 0;
    }
}
