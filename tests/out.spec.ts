import * as swissnode from '../src/index';

describe('out', () => {
  describe('pad', () => {
    it(`exists as 'out.pad'`, () => {
      expect(swissnode.out.pad).toBeDefined();
    });
  });

  describe('center', () => {
    it(`exists as 'out.center'`, () => {
      expect(swissnode.out.center).toBeDefined();
    });
  });

  describe('left', () => {
    it(`exists as 'out.left'`, () => {
      expect(swissnode.out.left).toBeDefined();
    });
  });

  describe('right', () => {
    it(`exists as 'out.right'`, () => {
      expect(swissnode.out.right).toBeDefined();
    });
  });

  describe('justify', () => {
    it(`exists as 'out.justify'`, () => {
      expect(swissnode.out.justify).toBeDefined();
    });
  });

  describe('leftLines', () => {
    it(`exists as 'out.leftLines'`, () => {
      expect(swissnode.out.leftLines).toBeDefined();
    });
  });

  describe('centerLines', () => {
    it(`exists as 'out.centerLines'`, () => {
      expect(swissnode.out.centerLines).toBeDefined();
    });
  });

  describe('rightLines', () => {
    it(`exists as 'out.rightLines'`, () => {
      expect(swissnode.out.rightLines).toBeDefined();
    });
  });

  describe('justifyLines', () => {
    it(`exists as 'out.justifyLines'`, () => {
      expect(swissnode.out.justifyLines).toBeDefined();
    });
  });

  describe('align', () => {
    it(`exists as 'out.align'`, () => {
      expect(swissnode.out.align).toBeDefined();
    });
  });

  describe('split', () => {
    it(`exists as 'out.split'`, () => {
      expect(swissnode.out.split).toBeDefined();
    });
  });

  describe('wrap', () => {
    it(`exists as 'out.wrap'`, () => {
      expect(swissnode.out.wrap).toBeDefined();
    });
  });

  describe('moveUp', () => {
    it(`exists as 'out.moveUp'`, () => {
      expect(swissnode.out.moveUp).toBeDefined();
    });
  });

  describe('loading', () => {
    it(`exists as 'out.loading'`, () => {
      expect(swissnode.out.loading).toBeDefined();
    });
  });

  describe('limitToLength', () => {
    it(`exists as 'out.limitToLength'`, () => {
      expect(swissnode.out.limitToLength).toBeDefined();
    });
  });

  describe('limitToLengthStart', () => {
    it(`exists as 'out.limitToLengthStart'`, () => {
      expect(swissnode.out.limitToLengthStart).toBeDefined();
    });
  });

  describe('truncate', () => {
    it(`exists as 'out.truncate'`, () => {
      expect(swissnode.out.truncate).toBeDefined();
    });
  });

  describe('truncateStart', () => {
    it(`exists as 'out.truncateStart'`, () => {
      expect(swissnode.out.truncateStart).toBeDefined();
    });
  });

  describe('concatLineGroups', () => {
    it(`exists as 'out.concatLineGroups'`, () => {
      expect(swissnode.out.concatLineGroups).toBeDefined();
    });
  });

  describe('getResponsiveValue', () => {
    it(`exists as 'out.getResponsiveValue'`, () => {
      expect(swissnode.out.getResponsiveValue).toBeDefined();
    });
  });

  describe('getBreadcrumb', () => {
    it(`exists as 'getBreadcrumb'`, () => {
      expect(swissnode.getBreadcrumb).toBeDefined();
    });
    it(`exists as 'out.getBreadcrumb'`, () => {
      expect(swissnode.out.getBreadcrumb).toBeDefined();
    });
  });

  describe('getLineCounter', () => {
    it(`exists as 'getLineCounter'`, () => {
      expect(swissnode.getLineCounter).toBeDefined();
    });
    it(`exists as 'out.getLineCounter'`, () => {
      expect(swissnode.out.getLineCounter).toBeDefined();
    });
  });

  describe('utils', () => {
    it(`exists as 'out.utils'`, () => {
      expect(swissnode.out.utils).toBeDefined();
    });

    describe('getTerminalWidth', () => {
      it(`exists as 'out.utils.getTerminalWidth'`, () => {
        expect(swissnode.out.utils.getTerminalWidth).toBeDefined();
      });
    });

    describe('getLines', () => {
      it(`exists as 'out.utils.getLines'`, () => {
        expect(swissnode.out.utils.getLines).toBeDefined();
      });
    });

    describe('getNumLines', () => {
      it(`exists as 'out.utils.getNumLines'`, () => {
        expect(swissnode.out.utils.getNumLines).toBeDefined();
      });
    });

    describe('getLinesWidth', () => {
      it(`exists as 'out.utils.getLinesWidth'`, () => {
        expect(swissnode.out.utils.getLinesWidth).toBeDefined();
      });
    });

    describe('getLogLines', () => {
      it(`exists as 'out.utils.getLogLines'`, () => {
        expect(swissnode.out.utils.getLogLines).toBeDefined();
      });
    });

    describe('getNumLogLines', () => {
      it(`exists as 'out.utils.getNumLogLines'`, () => {
        expect(swissnode.out.utils.getNumLogLines).toBeDefined();
      });
    });

    describe('getLogLinesWidth', () => {
      it(`exists as 'out.utils.getLogLinesWidth'`, () => {
        expect(swissnode.out.utils.getLogLinesWidth).toBeDefined();
      });
    });

    describe('joinLines', () => {
      it(`exists as 'out.utils.joinLines'`, () => {
        expect(swissnode.out.utils.joinLines).toBeDefined();
      });
    });

    describe('hasColor', () => {
      it(`exists as 'out.utils.hasColor'`, () => {
        expect(swissnode.out.utils.hasColor).toBeDefined();
      });
    });
  });
});
