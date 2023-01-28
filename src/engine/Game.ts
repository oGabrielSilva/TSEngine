import { Keyboard } from './modules/Keyboard';
import RenderObject from './modules/RenderObject';
import { Window } from './modules/Window';

export default class Game {
  public readonly root: HTMLCanvasElement;
  public readonly context: CanvasRenderingContext2D;
  public readonly renderingObjets: RenderObject[] = [];
  public readonly keyboard: Keyboard = new Keyboard();

  private constructor(rootId: string) {
    this.root = document.getElementById(rootId) as HTMLCanvasElement;
    this.context = this.root.getContext('2d');
    this.root.width = Game.SCREEN_BOUNDARIES.width;
    this.root.height = Game.SCREEN_BOUNDARIES.height;
    (globalThis as any).game = this;
  }

  private animate() {
    window.requestAnimationFrame(() => this.animate());
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.root.width, this.root.height);
    this.renderingObjets
      .sort(({ drawOrder: a }, { drawOrder: b }) => a - b)
      .forEach((render) => render.update());
  }

  public create(renderingObjets?: Array<RenderObject>) {
    Game.SCREEN_BOUNDARIES.defineWinDimensions(
      Game.SCREEN_BOUNDARIES.width,
      Game.SCREEN_BOUNDARIES.height
    );
    if (!!renderingObjets && renderingObjets.length > 0) {
      renderingObjets.forEach((obj) => this.renderingObjets.push(obj));
    }
    this.animate();
  }

  public addRenderingObject(render: RenderObject) {
    this.renderingObjets.push(render);
  }

  public removeRenderingObject(id: string) {
    const filtered = this.renderingObjets.filter((render) => render.id !== id);
    this.renderingObjets.length = 0;
    this.renderingObjets.push(...filtered);
  }

  public static Engine(canvasID: string) {
    const engine = new this(canvasID);
    return engine;
  }

  public static readonly SCREEN_BOUNDARIES = Window.default();
}
