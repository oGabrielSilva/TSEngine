export class Window {
  public width: number;
  public height: number;
  public onChangeValues: () => void;

  private constructor(onChangeValues = () => {}) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.onChangeValues = onChangeValues;
  }

  private defineListener() {
    globalThis.window.addEventListener('resize', () => {
      this.height = window.innerHeight;
      this.width = window.innerWidth;
      this.onChangeValues();
    });
  }

  public defineWidth(width: number) {
    this.width = width;
    this.onChangeValues();
  }

  public defineHeight(height: number) {
    this.height = height;
    this.onChangeValues();
  }

  public defineWinDimensions(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.onChangeValues();
  }

  public static default(onChangeValues = () => {}) {
    const win = new Window(onChangeValues);
    win.defineListener();
    return win;
  }
}
