import {Game} from "./game";
import {GameObject} from "./gameObject";

interface PlayerData{
    type: string,
    x: number,
    y: number
}
interface BlockData{
    type: string,
    x: number,
    y: number,
    w: number,
    h: number,
}
type GameObjectData = {
    type: string,
    data: PlayerData|BlockData};
interface Data{
    object:GameObjectData[];
}

export class Storeage{
    static save(game:Game){
        let data:Data = {object:[]};
        for(let block of game.blockList){
            let b:BlockData = {} as BlockData;
            b.type = "block";
            b.x = block.x;
            b.y = block.y;
            b.w = block.w;
            b.h = block.h;
            data.object.push({type: "block", data: b});
        }
        let p:PlayerData = {} as PlayerData;
        p.type = "player";
        p.x = game.player.x;
        p.y = game.player.y;
        data.object.push({type: "player", data:p});
        let a = document.createElement("a");
        a.setAttribute("download", "map.map");
        a.href = window.URL.createObjectURL(new Blob([JSON.stringify(data)], {type: "text.plain"}));
        a.click();
    }
}