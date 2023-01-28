import { Gravity } from './Gravity';

export default class Velocity {
  public gravity: Gravity | null = null;
  public disabledX = false;
  public disabledY = false;
  private readonly defaultValues = { velocityX: 0, velocityY: 0 };

  constructor(
    public velocityX: number = 0,
    public velocityY: number = 0,
    gravity: boolean = true
  ) {
    if (gravity) this.gravity = new Gravity();
    this.defaultValues.velocityX = velocityX;
    this.defaultValues.velocityY = velocityY;
  }

  public defineDefaultValues() {
    this.velocityX = this.defaultValues.velocityX;
    this.velocityY = this.defaultValues.velocityY;
  }

  public values() {
    return {
      velocity: { velocityX: this.velocityX, velocityY: this.velocityY },
      ...(this.gravity
        ? {
            gravity: {
              velocityX: this.gravity.gravityX,
              velocityY: this.gravity.gravityY,
            },
          }
        : {}),
    };
  }

  public velocity() {
    return { velocityX: this.velocityX, velocityY: this.velocityY };
  }

  public defineVelocityX(velocityX: number) {
    this.velocityX = velocityX;
  }

  public defineVelocityY(velocityY: number) {
    this.velocityY = velocityY;
  }

  public increment(velocityX?: number, velocityY?: number) {
    if (!!velocityX) this.velocityX += velocityX;
    if (!!velocityY) this.velocityY += velocityY;
  }

  public drecrement(velocityX?: number, velocityY?: number) {
    if (!!velocityX) this.velocityX -= velocityX;
    if (!!velocityY) this.velocityY -= velocityY;
  }

  public defineGravity(gravity: Gravity) {
    this.gravity = gravity;
  }

  public defineXOff() {
    this.disabledX = true;
  }

  public defineXOn() {
    this.disabledX = false;
  }

  public defineYOff() {
    this.disabledY = true;
  }

  public defineYOn() {
    this.disabledY = false;
  }
}
