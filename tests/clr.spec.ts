import * as swissnode from '../dist';
import { register, should, singleTest, multiTest, kitchenSink } from './test-utils';

register({ describe, it, expect });

// soon to be completely replaced so not updated to latest test style

describe('clr', () => {
  describe('gray0', () => {
    it(should` exist as 'chlk.gray0'`, () => {
      expect(swissnode.chlk.gray0).toBeDefined();
    });
    it(should` exist as 'clr.gray0'`, () => {
      expect(swissnode.clr.gray0).toBeDefined();
    });
  });

  describe('gray1', () => {
    it(should` exist as 'chlk.gray1'`, () => {
      expect(swissnode.chlk.gray1).toBeDefined();
    });
    it(should` exist as 'clr.gray1'`, () => {
      expect(swissnode.clr.gray1).toBeDefined();
    });
  });

  describe('gray2', () => {
    it(should` exist as 'chlk.gray2'`, () => {
      expect(swissnode.chlk.gray2).toBeDefined();
    });
    it(should` exist as 'clr.gray2'`, () => {
      expect(swissnode.clr.gray2).toBeDefined();
    });
  });

  describe('gray3', () => {
    it(should` exist as 'chlk.gray3'`, () => {
      expect(swissnode.chlk.gray3).toBeDefined();
    });
    it(should` exist as 'clr.gray3'`, () => {
      expect(swissnode.clr.gray3).toBeDefined();
    });
  });

  describe('gray4', () => {
    it(should` exist as 'chlk.gray4'`, () => {
      expect(swissnode.chlk.gray4).toBeDefined();
    });
    it(should` exist as 'clr.gray4'`, () => {
      expect(swissnode.clr.gray4).toBeDefined();
    });
  });

  describe('gray5', () => {
    it(should` exist as 'chlk.gray5'`, () => {
      expect(swissnode.chlk.gray5).toBeDefined();
    });
    it(should` exist as 'clr.gray5'`, () => {
      expect(swissnode.clr.gray5).toBeDefined();
    });
  });

  describe('grays', () => {
    it(should` exist as 'chlk.grays'`, () => {
      expect(swissnode.chlk.grays).toBeDefined();
    });
  });

  describe('gray', () => {
    it(should` exist as 'chlk.gray'`, () => {
      expect(swissnode.chlk.gray).toBeDefined();
    });
  });

  describe('clear', () => {
    it(should` exist as 'chlk.clear'`, () => {
      expect(swissnode.chlk.clear).toBeDefined();
    });
  });

  describe('not', () => {
    it(should` exist as 'chlk.not'`, () => {
      expect(swissnode.chlk.not).toBeDefined();
    });
  });

  describe('notUnderlined', () => {
    it(should` exist as 'chlk.notUnderlined'`, () => {
      expect(swissnode.chlk.notUnderlined).toBeDefined();
    });
  });

  describe('hl1', () => {
    it(should` exist as 'clr.hl1'`, () => {
      expect(swissnode.clr.hl1).toBeDefined();
    });
  });

  describe('hl2', () => {
    it(should` exist as 'clr.hl2'`, () => {
      expect(swissnode.clr.hl2).toBeDefined();
    });
  });

  describe('approve', () => {
    it(should` exist as 'clr.approve'`, () => {
      expect(swissnode.clr.approve).toBeDefined();
    });
  });

  describe('create', () => {
    it(should` exist as 'clr.create'`, () => {
      expect(swissnode.clr.create).toBeDefined();
    });
  });

  describe('update', () => {
    it(should` exist as 'clr.update'`, () => {
      expect(swissnode.clr.update).toBeDefined();
    });
  });

  describe('remove', () => {
    it(should` exist as 'clr.remove'`, () => {
      expect(swissnode.clr.remove).toBeDefined();
    });
  });

  describe('removeAll', () => {
    it(should` exist as 'clr.removeAll'`, () => {
      expect(swissnode.clr.removeAll).toBeDefined();
    });
  });

  describe('blue', () => {
    it(should` exist as 'clr.blue'`, () => {
      expect(swissnode.clr.blue).toBeDefined();
    });
  });

  describe('cyan', () => {
    it(should` exist as 'clr.cyan'`, () => {
      expect(swissnode.clr.cyan).toBeDefined();
    });
  });

  describe('green', () => {
    it(should` exist as 'clr.green'`, () => {
      expect(swissnode.clr.green).toBeDefined();
    });
  });

  describe('magenta', () => {
    it(should` exist as 'clr.magenta'`, () => {
      expect(swissnode.clr.magenta).toBeDefined();
    });
  });

  describe('red', () => {
    it(should` exist as 'clr.red'`, () => {
      expect(swissnode.clr.red).toBeDefined();
    });
  });

  describe('yellow', () => {
    it(should` exist as 'clr.yellow'`, () => {
      expect(swissnode.clr.yellow).toBeDefined();
    });
  });

  describe('t1', () => {
    it(should` exist as 'clr.t1'`, () => {
      expect(swissnode.clr.t1).toBeDefined();
    });
  });

  describe('t2', () => {
    it(should` exist as 'clr.t2'`, () => {
      expect(swissnode.clr.t2).toBeDefined();
    });
  });

  describe('t3', () => {
    it(should` exist as 'clr.t3'`, () => {
      expect(swissnode.clr.t3).toBeDefined();
    });
  });

  describe('t4', () => {
    it(should` exist as 'clr.t4'`, () => {
      expect(swissnode.clr.t4).toBeDefined();
    });
  });

  describe('t5', () => {
    it(should` exist as 'clr.t5'`, () => {
      expect(swissnode.clr.t5).toBeDefined();
    });
  });

  describe('t6', () => {
    it(should` exist as 'clr.t6'`, () => {
      expect(swissnode.clr.t6).toBeDefined();
    });
  });
});
