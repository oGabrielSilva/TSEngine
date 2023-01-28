import ID from '../../utils/ID';
import type Game from '../Game';

export default class RenderObject {
  public readonly id: string = ID.render();
  public readonly context: CanvasRenderingContext2D;
  public listOfIgnoredTagsInCollision: InterfaceObjectKeyString<string> = {};
  public rotate: number = 0;
  public beforeDrawing = (context: CanvasRenderingContext2D) => {
    this.context.save();
  };
  public afterDrawing = (context: CanvasRenderingContext2D) => {
    this.context.restore();
  };

  constructor(
    public readonly scope: Game,
    public positionX: number = 0,
    public positionY: number = 0,
    public width: number = 0,
    public height: number = 0,
    public active: boolean = true,
    public color: string = '#000000',
    public drawOrder: number = 0,
    public tag: string | number = 0
  ) {
    this.context = scope.context;
  }

  public draw() {
    this.beforeDrawing(this.context);
    this.context.fillStyle = this.color;
    if (this.rotate !== 0) {
      this.context.translate(
        this.positionX + this.width / 2,
        this.positionY + this.height / 2
      );
      this.context.rotate(this.rotate);
      this.context.translate(
        -this.positionX - this.width / 2,
        -this.positionY - this.height / 2
      );
    }
    this.context.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
    this.afterDrawing(this.context);
    this.resetAfterDrawing();
    this.resetBeforeDrawing();
  }

  public update() {
    if (this.active) this.draw();
  }

  public defineBeforeDrawing(callback: typeof this.beforeDrawing) {
    this.beforeDrawing = callback;
  }

  public defineAfterDrawing(callback: typeof this.afterDrawing) {
    this.afterDrawing = callback;
  }

  public ignoreCollisionByTag(...tags: string[]) {
    if (!!tags)
      tags.forEach((tag) => (this.listOfIgnoredTagsInCollision[tag] = tag));
  }

  public removeIgnoreCollisionByTag(tag: string) {
    if (!!this.listOfIgnoredTagsInCollision[tag])
      delete this.listOfIgnoredTagsInCollision[tag];
  }

  public detectCollision() {
    return this.scope.renderingObjets.filter((render) => {
      return (
        this.id !== render.id &&
        this.positionX < render.positionX + render.width &&
        this.positionX + this.width > render.positionX &&
        this.positionY < render.positionY + render.height &&
        this.height + this.positionY > render.positionY &&
        this.drawOrder === render.drawOrder &&
        !this.listOfIgnoredTagsInCollision[render.tag]
      );
    });
  }

  public definePositionX(positionX: number) {
    this.positionX = positionX;
  }

  public definePositionY(positionY: number) {
    this.positionY = positionY;
  }

  public defineWidth(width: number) {
    this.width = width;
  }

  public defineHeight(height: number) {
    this.height = height;
  }

  public getPosition() {
    return { x: this.positionX, y: this.positionY };
  }

  public definePosition(positionX: number, positionY: number) {
    this.positionX = positionX;
    this.positionY = positionY;
  }

  public getSize() {
    return { w: this.width, h: this.height };
  }

  public defineDrawOrder(order: number) {
    this.drawOrder = order;
  }

  public defineTag(tag: string) {
    this.tag = tag;
  }

  public defineRotate(angle: number) {
    this.rotate = angle;
  }

  private resetBeforeDrawing() {
    this.beforeDrawing = () => {
      this.context.save();
    };
  }

  private resetAfterDrawing() {
    this.afterDrawing = () => {
      this.context.restore();
    };
  }
}
