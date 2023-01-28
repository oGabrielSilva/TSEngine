import ID from '../../utils/ID';

export default class GameObjectListener {
  public readonly id: string = ID.render();

  constructor(public callback: TypeCharListener) {}

  public defineCallback(callback: TypeCharListener) {
    this.callback = callback;
  }

  public exec(event: InterfaceCharListenerEvent) {
    this.callback(event);
  }

  public static move(velocity: number = 5) {
    return new GameObjectListener((e: InterfaceCharListenerEvent) => {
      if (
        e.mobile.scope.keyboard.KEY_LIST.w.clicked &&
        !e.mobile.scope.keyboard.KEY_LIST.s.clicked &&
        !e.mobile.velocity2D.disabledY
      ) {
        e.mobile.velocity2D.defineVelocityY(-velocity);
      } else if (
        e.mobile.scope.keyboard.KEY_LIST.s.clicked &&
        !e.mobile.scope.keyboard.KEY_LIST.w.clicked &&
        !e.mobile.velocity2D.disabledY
      ) {
        e.mobile.velocity2D.defineVelocityY(velocity);
      } else {
        e.mobile.velocity2D.defineVelocityY(0);
      }

      if (
        e.mobile.scope.keyboard.KEY_LIST.a.clicked &&
        !e.mobile.scope.keyboard.KEY_LIST.d.clicked &&
        !e.mobile.velocity2D.disabledX
      ) {
        e.mobile.velocity2D.defineVelocityX(-velocity);
      } else if (
        e.mobile.scope.keyboard.KEY_LIST.d.clicked &&
        !e.mobile.scope.keyboard.KEY_LIST.a.clicked &&
        !e.mobile.velocity2D.disabledX
      ) {
        e.mobile.velocity2D.defineVelocityX(velocity);
      } else {
        e.mobile.velocity2D.defineVelocityX(0);
      }
    });
  }
}
