import Game from './engine/Game';
import Mobile from './engine/modules/Mobile';
import GameObjectListener from './engine/modules/GameObjectListener';
import RenderObject from './engine/modules/RenderObject';
import Velocity from './engine/modules/Velocity';

(function main() {
  const game = Game.Engine('root');
  const player = new Mobile(
    game,
    Game.SCREEN_BOUNDARIES.width / 2 - 16,
    Game.SCREEN_BOUNDARIES.height - 94,
    32,
    32,
    true,
    '#2323ff'
  );
  player.addListener(GameObjectListener.move(8));
  player.velocity2D.defineYOff();
  function addBullet() {
    const bullet = new Mobile(
      game,
      player.positionX + player.width / 2 - 5,
      player.positionY - 15,
      10,
      10,
      true,
      '#2323ff',
      0,
      'Bullet',
      new Velocity(0, -12, false)
    );
    bullet.ignoreCollisionByTag('Player');
    bullet.addListener(
      new GameObjectListener(({ listener, mobile }) => {
        if (mobile.positionY > -100) return;
        mobile.removeListener(listener.id);
        game.removeRenderingObject(mobile.id);
      })
    );
    game.addRenderingObject(bullet);
  }
  setInterval(addBullet, 500);
  player.addListener(
    new GameObjectListener(({ mobile }) => {
      if (
        mobile.scope.keyboard.KEY_LIST.a.clicked &&
        !mobile.scope.keyboard.KEY_LIST.d.clicked
      ) {
        mobile.defineRotate(-0.15);
      } else if (
        mobile.scope.keyboard.KEY_LIST.d.clicked &&
        !mobile.scope.keyboard.KEY_LIST.a.clicked
      ) {
        mobile.defineRotate(0.15);
      } else mobile.defineRotate(0);
    })
  );
  const leftWall = new RenderObject(
    game,
    0,
    0,
    1,
    Game.SCREEN_BOUNDARIES.height,
    true,
    'black',
    0,
    'Wall'
  );
  const rightWall = new RenderObject(
    game,
    Game.SCREEN_BOUNDARIES.width,
    0,
    1,
    Game.SCREEN_BOUNDARIES.height,
    true,
    'black',
    0,
    'Wall'
  );
  game.create([
    new Mobile(game, 60, 100, 32, 32, true, '#f0f'),
    leftWall,
    rightWall,
  ]);
  game.addRenderingObject(player);
})();
