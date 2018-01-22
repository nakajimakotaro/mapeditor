import {Game} from "./game";
import {GameObject} from "./gameObject";

type GameObjectData = {
    type: string,
    data: any
};
interface Data{
    object:GameObjectData[];
}

export class Storeage{
    static save(game:Game){
        let data:Data = {object:[]};
        for(let obj of game.objectList){
            data.object.push({type: obj.getType(), data: obj.toSaveData()});
        }
        data.object.push({type: game.player.getType(), data:game.player.toSaveData()});

        let a = document.createElement("a");
        a.setAttribute("download", "map.json");
        a.href = window.URL.createObjectURL(new Blob([JSON.stringify(data, undefined, 2)], {type: "text.plain"}));
        a.click();
    }
}