import {State} from "./state";
import {Game} from "./game";
import {Screen} from "./screen";
import {GameObject} from "./gameObject";
import {Block} from "./block";
import {NoneState} from "./noneState";

export class EnemyCreate implements State {
    enemy:Enemy;
    constructor(public game:Game) {
    }
    start() {
        const pos = Block.gridMatch(this.game, this.game.input.layerMouseX("main")!,this.game.input.layerMouseY("main")!);
        this.enemy = new Enemy(pos.x, pos.y);
        this.game.objectList.push(this.enemy);
    }

    update() {
        this.game.changeState(new NoneState());
    }

    draw() {
    }

    end() {
    }
}
export class Enemy implements GameObject{
    constructor(public x, public y){

    }
    update() {
    }

    draw(screen: Screen) {
        screen.beginFill(0xff5000, 0.6);
        screen.lineStyle(1,0xff5000, 0.6);
        screen.drawCircle(this.x, this.y, 36, "main");
    }

    getType(): string {
        return "enemy";
    }

    toSaveData():any{
    }

}