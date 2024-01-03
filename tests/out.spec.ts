import * as swissnode from '../';
import { register, should, singleTest, multiTest, kitchenSink } from './test-utils';

register({ describe, it, expect });

describe('out', () => {
  describe('getWidth', () => {
    singleTest(swissnode.out.getWidth, 'out.getWidth', (getWidth, name) => {
      it(should` exist as ${name}`, () => {
        expect(getWidth).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('pad', () => {
    singleTest(swissnode.out.pad, 'out.pad', (pad, name) => {
      it(should` exist as ${name}`, () => {
        expect(pad).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('center', () => {
    singleTest(swissnode.out.center, 'out.center', (center, name) => {
      it(should` exist as ${name}`, () => {
        expect(center).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('left', () => {
    singleTest(swissnode.out.left, 'out.left', (left, name) => {
      it(should` exist as ${name}`, () => {
        expect(left).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('right', () => {
    singleTest(swissnode.out.right, 'out.right', (right, name) => {
      it(should` exist as ${name}`, () => {
        expect(right).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('justify', () => {
    singleTest(swissnode.out.justify, 'out.justify', (justify, name) => {
      it(should` exist as ${name}`, () => {
        expect(justify).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('leftLines', () => {
    singleTest(swissnode.out.leftLines, 'out.leftLines', (leftLines, name) => {
      it(should` exist as ${name}`, () => {
        expect(leftLines).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('centerLines', () => {
    singleTest(swissnode.out.centerLines, 'out.centerLines', (centerLines, name) => {
      it(should` exist as ${name}`, () => {
        expect(centerLines).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('rightLines', () => {
    singleTest(swissnode.out.rightLines, 'out.rightLines', (rightLines, name) => {
      it(should` exist as ${name}`, () => {
        expect(rightLines).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('justifyLines', () => {
    singleTest(swissnode.out.justifyLines, 'out.justifyLines', (justifyLines, name) => {
      it(should` exist as ${name}`, () => {
        expect(justifyLines).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('align', () => {
    singleTest(swissnode.out.align, 'out.align', (align, name) => {
      it(should` exist as ${name}`, () => {
        expect(align).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('split', () => {
    singleTest(swissnode.out.split, 'out.split', (split, name) => {
      it(should` exist as ${name}`, () => {
        expect(split).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('wrap', () => {
    singleTest(swissnode.out.wrap, 'out.wrap', (wrap, name) => {
      it(should` exist as ${name}`, () => {
        expect(wrap).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('moveUp', () => {
    singleTest(swissnode.out.moveUp, 'out.moveUp', (moveUp, name) => {
      it(should` exist as ${name}`, () => {
        expect(moveUp).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('loading', () => {
    singleTest(swissnode.out.loading, 'out.loading', (loading, name) => {
      it(should` exist as ${name}`, () => {
        expect(loading).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('limitToLength', () => {
    singleTest(swissnode.out.limitToLength, 'out.limitToLength', (limitToLength, name) => {
      it(should` exist as ${name}`, () => {
        expect(limitToLength).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('limitToLengthStart', () => {
    singleTest(swissnode.out.limitToLengthStart, 'out.limitToLengthStart', (limitToLengthStart, name) => {
      it(should` exist as ${name}`, () => {
        expect(limitToLengthStart).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('truncate', () => {
    singleTest(swissnode.out.truncate, 'out.truncate', (truncate, name) => {
      it(should` exist as ${name}`, () => {
        expect(truncate).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('truncateStart', () => {
    singleTest(swissnode.out.truncateStart, 'out.truncateStart', (truncateStart, name) => {
      it(should` exist as ${name}`, () => {
        expect(truncateStart).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('concatLineGroups', () => {
    singleTest(swissnode.out.concatLineGroups, 'out.concatLineGroups', (concatLineGroups, name) => {
      it(should` exist as ${name}`, () => {
        expect(concatLineGroups).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('getResponsiveValue', () => {
    singleTest(swissnode.out.getResponsiveValue, 'out.getResponsiveValue', (getResponsiveValue, name) => {
      it(should` exist as ${name}`, () => {
        expect(getResponsiveValue).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('getBreadcrumb', () => {
    multiTest(
      [
        [swissnode.getBreadcrumb, 'getBreadcrumb'],
        [swissnode.out.getBreadcrumb, 'out.getBreadcrumb']
      ],
      (getBreadcrumb, name) => {
        it(should` exist as ${name}`, () => {
          expect(getBreadcrumb).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      }
    );
  });

  describe('getLineCounter', () => {
    multiTest(
      [
        [swissnode.getLineCounter, 'getLineCounter'],
        [swissnode.out.getLineCounter, 'out.getLineCounter']
      ],
      (getLineCounter, name) => {
        it(should` exist as ${name}`, () => {
          expect(getLineCounter).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      }
    );
  });

  describe('utils', () => {
    it(should` exist as 'out.utils'`, () => {
      expect(swissnode.out.utils).toBeDefined();
    });

    // TODO tests
    // TODO add arg safety
    // TODO kitchenSink

    describe('getTerminalWidth', () => {
      singleTest(swissnode.out.utils.getTerminalWidth, 'out.utils.getTerminalWidth', (getTerminalWidth, name) => {
        it(should` exist as ${name}`, () => {
          expect(getTerminalWidth).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });

    describe('getLines', () => {
      singleTest(swissnode.out.utils.getLines, 'out.utils.getLines', (getLines, name) => {
        it(should` exist as ${name}`, () => {
          expect(getLines).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });

    describe('getNumLines', () => {
      singleTest(swissnode.out.utils.getNumLines, 'out.utils.getNumLines', (getNumLines, name) => {
        it(should` exist as ${name}`, () => {
          expect(getNumLines).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });

    describe('getLinesWidth', () => {
      singleTest(swissnode.out.utils.getLinesWidth, 'out.utils.getLinesWidth', (getLinesWidth, name) => {
        it(should` exist as ${name}`, () => {
          expect(getLinesWidth).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });

    describe('getLogLines', () => {
      singleTest(swissnode.out.utils.getLogLines, 'out.utils.getLogLines', (getLogLines, name) => {
        it(should` exist as ${name}`, () => {
          expect(getLogLines).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });

    describe('getNumLogLines', () => {
      singleTest(swissnode.out.utils.getNumLogLines, 'out.utils.getNumLogLines', (getNumLogLines, name) => {
        it(should` exist as ${name}`, () => {
          expect(getNumLogLines).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });

    describe('getLogLinesWidth', () => {
      singleTest(swissnode.out.utils.getLogLinesWidth, 'out.utils.getLogLinesWidth', (getLogLinesWidth, name) => {
        it(should` exist as ${name}`, () => {
          expect(getLogLinesWidth).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });

    describe('joinLines', () => {
      singleTest(swissnode.out.utils.joinLines, 'out.utils.joinLines', (joinLines, name) => {
        it(should` exist as ${name}`, () => {
          expect(joinLines).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });

    describe('hasColor', () => {
      singleTest(swissnode.out.utils.hasColor, 'out.utils.hasColor', (hasColor, name) => {
        it(should` exist as ${name}`, () => {
          expect(hasColor).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });

    describe('stripAnsi', () => {
      singleTest(swissnode.out.utils.stripAnsi, 'out.utils.stripAnsi', (stripAnsi, name) => {
        it(should` exist as ${name}`, () => {
          expect(stripAnsi).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });
    describe('getEmojiRegex', () => {
      singleTest(swissnode.out.utils.getEmojiRegex, 'out.utils.getEmojiRegex', (getEmojiRegex, name) => {
        it(should` exist as ${name}`, () => {
          expect(getEmojiRegex).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });
  });
});
