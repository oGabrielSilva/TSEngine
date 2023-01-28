export class Gravity {
  constructor(public gravityX: number = 0, public gravityY: number = 0) {}

  public values() {
    return { x: this.gravityX, y: this.gravityY };
  }

  public defineValues(x: number, y: number) {
    this.gravityX = x;
    this.gravityY = y;
  }

  public defineValueX(x: number) {
    this.gravityX = x;
  }

  public defineValueY(y: number) {
    this.gravityY = y;
  }

  public increment(x?: number, y?: number) {
    if (!!x) this.gravityX += x;
    if (!!y) this.gravityY += y;
  }

  public drecrement(x?: number, y?: number) {
    if (!!x) this.gravityX -= x;
    if (!!y) this.gravityY -= y;
  }
}
