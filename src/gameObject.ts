import {Screen} from "./screen";


export enum GameObjectType{
    Block,
    Player,
}
export interface GameObject{
    update();
    draw(screen:Screen);
    getType():GameObjectType;
}