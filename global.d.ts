import Mobile from './src/engine/modules/Mobile';
import GameObjectListener from './src/engine/modules/GameObjectListener';

declare global {
  interface InterfaceKeyboardListKeyObject {
    name: string;
    clicked: boolean;
  }
  interface InterfaceObjectKeyString<T> {
    [key: string]: T;
  }
  interface InterfaceCharListenerEvent {
    mobile: Mobile;
    listener: GameObjectListener;
  }
  type TypeFuncVoid = () => void;
  type TypeCharListener = (event: InterfaceCharListenerEvent) => void;
}

export {};
