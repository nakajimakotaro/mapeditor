import {Screen} from "./screen";


export enum GameObjectType{
    Enemy,
    Block,
    MoveBlock,
    Player,
}
export interface GameObject{
    update();
    draw(screen:Screen);
    getType():string;
    toSaveData():any;
}