/**<!-- DOCS: keyListener ##! -->
 * keyListener
 */

/**<!-- DOCS: keyListener.getKeyListener ### @ -->
 * getKeyListener
 *
 * - `getKeyListener`
 *
 * Listens for key presses and returns the key name and raw value.
 *
 * ```typescript
 * const kl = getKeyListener((keyName, rawValue) => {
 *   // do something with keyName and rawValue
 * });
 *
 * kl.start();
 *
 * // later...
 *
 * kl.stop();
 * ```
 * @param {(keyName?: string, rawValue?: string) => void} callback
 * @param {boolean} [isStart=true]
 * @param {boolean} [isDebugLog=false]
 * @returns {KeyListener}
 */
export const getKeyListener = (
  callback: (keyName?: string, rawValue?: string) => void,
  isStart: boolean = true,
  isDebugLog: boolean = false
): KeyListener => {
  const listenFn = (key: any) => {
    if (isDebugLog) {
      console.log(JSON.stringify(key)); // use this to preview key codes
    }

    if (key == '') {
      return callback('backspace', key);
    }
    if (key == '\u001b[3~') {
      return callback('delete', key);
    }

    if (key == '\r') {
      return callback('return', key);
    }
    if (key == '\t') {
      return callback('tab', key);
    }
    if (key == '\u001B\u005B\u0041') {
      return callback('up', key);
    }
    if (key == '\u001B\u005B\u0043') {
      return callback('right', key);
    }
    if (key == '\u001B\u005B\u0042') {
      return callback('down', key);
    }
    if (key == '\u001B\u005B\u0044') {
      return callback('left', key);
    }
    if (key == ' ') {
      return callback('space', key);
    }
    if (key === '\u001b') {
      return callback('esc', key);
    }

    // ctrl-c
    if (key == '\u0003') {
      return process.exit();
    }

    // fallback (any normal letter/number/symbol)
    if (key.length === 1) {
      return callback(key, key);
    }
  };

  const start = () => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', listenFn);
    process.stdout.write('\x1B[?25l'); // hide cursor
  };

  const stop = () => {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.stdin.off('data', listenFn);
    process.stdout.write('\x1B[?25h'); // show cursor
  };

  if (isStart) start();

  return {
    start,
    stop
  };
};

/**<!-- DOCS: keyListener.KeyListener ### -->
 * KeyListener
 *
 * - `KeyListener`
 *
 * Returned by `getKeyListener`
 */
export interface KeyListener {
  /**<!-- DOCS: keyListener.KeyListener.start #### -->
   * start
   *
   * - `kl.start`
   *
   * Start listening for key presses
   * @returns {void}
   */
  start(): void;

  /**<!-- DOCS: keyListener.KeyListener.stop #### -->
   * stop
   *
   * - `kl.stop`
   *
   * Stop listening for key presses
   * @returns {void}
   */
  stop(): void;
}
