import Graphics = PIXI.Graphics;

export interface State{
    start();
    update();
    draw();
    end();
}