export default class ID {
  public static render() {
    const id = ID.CURRENT_ID.toString();
    ID.CURRENT_ID += 1;
    return 'u:'.concat(
      Date.now().toString(36),
      '-',
      Math.random().toString(32).slice(2),
      '-',
      Math.random().toString(28).slice(2),
      '-',
      Math.random().toString(24).slice(2),
      ':',
      id
    );
  }

  private static CURRENT_ID = 0;
}
