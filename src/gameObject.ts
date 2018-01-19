import {Screen} from "./screen";


export enum GameObjectType{
    Block,
    MoveBlock,
    Player,
}
export interface GameObject{
    update();
    draw(screen:Screen);
    getType():GameObjectType;
}