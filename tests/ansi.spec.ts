import * as swissnode from '../';
import { register, should, singleTest, multiTest, kitchenSink } from './test-utils';

register({ describe, it, expect });

describe('ansi', () => {
  multiTest(
    [
      [swissnode.ansi, 'ansi'],
      [swissnode.out.ansi, 'out.ansi']
    ],
    (ansi, name) => {
      it(should` exist as ${name}`, () => {
        expect(ansi).toBeDefined();
      });

      describe('cursor', () => {
        describe('to', () => {
          singleTest(ansi.cursor.to, 'out.ansi.cursor.to', (to, name) => {
            it(should` exist as ${name}`, () => {
              expect(to).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('move', () => {
          singleTest(ansi.cursor.move, 'out.ansi.cursor.move', (move, name) => {
            it(should` exist as ${name}`, () => {
              expect(move).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('up', () => {
          singleTest(ansi.cursor.up, 'out.ansi.cursor.up', (up, name) => {
            it(should` exist as ${name}`, () => {
              expect(up).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('down', () => {
          singleTest(ansi.cursor.down, 'out.ansi.cursor.down', (down, name) => {
            it(should` exist as ${name}`, () => {
              expect(down).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('left', () => {
          singleTest(ansi.cursor.left, 'out.ansi.cursor.left', (left, name) => {
            it(should` exist as ${name}`, () => {
              expect(left).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('right', () => {
          singleTest(ansi.cursor.right, 'out.ansi.cursor.right', (right, name) => {
            it(should` exist as ${name}`, () => {
              expect(right).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('nextLine', () => {
          singleTest(ansi.cursor.nextLine, 'out.ansi.cursor.nextLine', (nextLine, name) => {
            it(should` exist as ${name}`, () => {
              expect(nextLine).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('prevLine', () => {
          singleTest(ansi.cursor.prevLine, 'out.ansi.cursor.prevLine', (prevLine, name) => {
            it(should` exist as ${name}`, () => {
              expect(prevLine).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('lineStart', () => {
          singleTest(ansi.cursor.lineStart, 'out.ansi.cursor.lineStart', (lineStart, name) => {
            it(should` exist as ${name}`, () => {
              expect(lineStart).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('setShow', () => {
          singleTest(ansi.cursor.setShow, 'out.ansi.cursor.setShow', (setShow, name) => {
            it(should` exist as ${name}`, () => {
              expect(setShow).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('show', () => {
          singleTest(ansi.cursor.show, 'out.ansi.cursor.show', (show, name) => {
            it(should` exist as ${name}`, () => {
              expect(show).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('hide', () => {
          singleTest(ansi.cursor.hide, 'out.ansi.cursor.hide', (hide, name) => {
            it(should` exist as ${name}`, () => {
              expect(hide).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('save', () => {
          singleTest(ansi.cursor.save, 'out.ansi.cursor.save', (save, name) => {
            it(should` exist as ${name}`, () => {
              expect(save).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('restore', () => {
          singleTest(ansi.cursor.restore, 'out.ansi.cursor.restore', (restore, name) => {
            it(should` exist as ${name}`, () => {
              expect(restore).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });
      });

      describe('scroll', () => {
        describe('up', () => {
          singleTest(ansi.scroll.up, 'out.ansi.scroll.up', (up, name) => {
            it(should` exist as ${name}`, () => {
              expect(up).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('down', () => {
          singleTest(ansi.scroll.down, 'out.ansi.scroll.down', (down, name) => {
            it(should` exist as ${name}`, () => {
              expect(down).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });
      });

      describe('erase', () => {
        describe('screen', () => {
          singleTest(ansi.erase.screen, 'out.ansi.erase.screen', (screen, name) => {
            it(should` exist as ${name}`, () => {
              expect(screen).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('up', () => {
          singleTest(ansi.erase.up, 'out.ansi.erase.up', (up, name) => {
            it(should` exist as ${name}`, () => {
              expect(up).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('down', () => {
          singleTest(ansi.erase.down, 'out.ansi.erase.down', (down, name) => {
            it(should` exist as ${name}`, () => {
              expect(down).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('line', () => {
          singleTest(ansi.erase.line, 'out.ansi.erase.line', (line, name) => {
            it(should` exist as ${name}`, () => {
              expect(line).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('lineEnd', () => {
          singleTest(ansi.erase.lineEnd, 'out.ansi.erase.lineEnd', (lineEnd, name) => {
            it(should` exist as ${name}`, () => {
              expect(lineEnd).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('lineStart', () => {
          singleTest(ansi.erase.lineStart, 'out.ansi.erase.lineStart', (lineStart, name) => {
            it(should` exist as ${name}`, () => {
              expect(lineStart).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('lines', () => {
          singleTest(ansi.erase.lines, 'out.ansi.erase.lines', (lines, name) => {
            it(should` exist as ${name}`, () => {
              expect(lines).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });

        describe('reserve', () => {
          singleTest(ansi.erase.reserve, 'out.ansi.erase.reserve', (reserve, name) => {
            it(should` exist as ${name}`, () => {
              expect(reserve).toBeDefined();
            });

            // TODO tests
            // TODO add arg safety
            // TODO kitchenSink
          });
        });
      });

      describe('clear', () => {
        singleTest(ansi.clear, 'out.ansi.clear', (clear, name) => {
          it(should` exist as ${name}`, () => {
            expect(clear).toBeDefined();
          });

          // TODO tests
          // TODO add arg safety
          // TODO kitchenSink
        });
      });

      describe('beep', () => {
        singleTest(ansi.beep, 'out.ansi.beep', (beep, name) => {
          it(should` exist as ${name}`, () => {
            expect(beep).toBeDefined();
          });

          // TODO tests
          // TODO add arg safety
          // TODO kitchenSink
        });
      });

      describe('null', () => {
        singleTest(ansi.null, 'out.ansi.null', (nullAnsi, name) => {
          it(should` exist as ${name}`, () => {
            expect(nullAnsi).toBeDefined();
          });

          // TODO tests
          // TODO add arg safety
          // TODO kitchenSink
        });
      });
    }
  );
});
