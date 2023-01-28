import { listOfKeys } from '../../utils/listOfKeys';

type T = InterfaceObjectKeyString<InterfaceKeyboardListKeyObject>;

export class Keyboard {
  public readonly KEY_LIST = listOfKeys;

  constructor(
    public lastKey: string = '',
    public currentKeydown: string | null = null,
    public currentKeyup: string | null = null
  ) {
    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase() === ' ' ? 'space' : e.key.toLowerCase();
      this.currentKeydown = key;
      if ((this.KEY_LIST as T)[key]) {
        (this.KEY_LIST as T)[key].clicked = true;
      }
    });
    window.addEventListener('keyup', (e) => {
      const key = e.key.toLowerCase() === ' ' ? 'space' : e.key.toLowerCase();
      this.lastKey = key;
      this.currentKeydown = null;
      this.currentKeyup = key;
      if ((this.KEY_LIST as T)[key]) (this.KEY_LIST as T)[key].clicked = false;
    });
  }

  public values() {
    const { currentKeydown, currentKeyup, lastKey } = this;
    return { currentKeydown, currentKeyup, lastKey };
  }
}
