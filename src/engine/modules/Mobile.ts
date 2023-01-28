import Game from '../Game';
import GameObjectListener from './GameObjectListener';
import RenderObject from './RenderObject';
import Velocity from './Velocity';

export default class Mobile extends RenderObject {
  public listOfListeners: Array<GameObjectListener> = [];

  constructor(
    public readonly scope: Game,
    public positionX: number = 0,
    public positionY: number = 0,
    public width: number = 0,
    public height: number = 0,
    public active: boolean = true,
    public color: string = '#000000',
    public drawOrder: number = 0,
    public tag: string | number = 0,
    public readonly velocity2D: Velocity = new Velocity()
  ) {
    super(
      scope,
      positionX,
      positionY,
      width,
      height,
      active,
      color,
      drawOrder,
      tag
    );
  }

  public update(): void {
    super.update();
    if (!this.active) return;
    this.updatePosition();
    this.listOfListeners.forEach((listener) =>
      listener.exec({ mobile: this, listener })
    );
  }

  public removeListener(id: string) {
    this.listOfListeners = this.listOfListeners.filter(
      (listener) => listener.id !== id
    );
  }

  public addListener(...listeners: GameObjectListener[]) {
    this.listOfListeners.push(...listeners);
  }

  private updatePosition() {
    for (let i = 0; i < Math.abs(this.velocity2D.velocityX); i++) {
      this.definePositionX(
        this.positionX + (this.velocity2D.velocityX < 0 ? -1 : 1)
      );
      const list = this.detectCollision().filter(
        (render) => !this.listOfIgnoredTagsInCollision[render.tag]
      );
      if (list.length > 0) {
        this.definePositionX(
          this.positionX + (this.velocity2D.velocityX < 0 ? 1 : -1)
        );
        i = Math.abs(this.velocity2D.velocityX + 1);
      }
    }
    for (let i = 0; i < Math.abs(this.velocity2D.velocityY); i++) {
      this.definePositionY(
        this.positionY + (this.velocity2D.velocityY < 0 ? -1 : 1)
      );
      const list = this.detectCollision();
      if (list.length > 0) {
        this.definePositionY(
          this.positionY + (this.velocity2D.velocityY < 0 ? 1 : -1)
        );
        i = Math.abs(this.velocity2D.velocityY + 1);
      }
    }
  }
}
