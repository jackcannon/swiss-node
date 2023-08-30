import * as swissnode from '../src/index';

describe('ask', () => {
  describe('text', () => {
    it(`exists as 'ask.text'`, () => {
      expect(swissnode.ask.text).toBeDefined();
    });
  });

  describe('autotext', () => {
    it(`exists as 'ask.autotext'`, () => {
      expect(swissnode.ask.autotext).toBeDefined();
    });
  });

  describe('number', () => {
    it(`exists as 'ask.number'`, () => {
      expect(swissnode.ask.number).toBeDefined();
    });
  });

  describe('boolean', () => {
    it(`exists as 'ask.boolean'`, () => {
      expect(swissnode.ask.boolean).toBeDefined();
    });
  });

  describe('booleanAlt', () => {
    it(`exists as 'ask.booleanAlt'`, () => {
      expect(swissnode.ask.booleanAlt).toBeDefined();
    });
  });

  describe('select', () => {
    it(`exists as 'ask.select'`, () => {
      expect(swissnode.ask.select).toBeDefined();
    });
  });

  describe('multiselect', () => {
    it(`exists as 'ask.multiselect'`, () => {
      expect(swissnode.ask.multiselect).toBeDefined();
    });
  });

  describe('crud', () => {
    it(`exists as 'ask.crud'`, () => {
      expect(swissnode.ask.crud).toBeDefined();
    });
  });

  describe('validate', () => {
    it(`exists as 'ask.validate'`, () => {
      expect(swissnode.ask.validate).toBeDefined();
    });
  });

  describe('imitate', () => {
    it(`exists as 'ask.imitate'`, () => {
      expect(swissnode.ask.imitate).toBeDefined();
    });
  });

  describe('prefill', () => {
    it(`exists as 'ask.prefill'`, () => {
      expect(swissnode.ask.prefill).toBeDefined();
    });
  });

  describe('loading', () => {
    it(`exists as 'ask.loading'`, () => {
      expect(swissnode.ask.loading).toBeDefined();
    });
  });

  describe('pause', () => {
    it(`exists as 'ask.pause'`, () => {
      expect(swissnode.ask.pause).toBeDefined();
    });
  });

  describe('countdown', () => {
    it(`exists as 'ask.countdown'`, () => {
      expect(swissnode.ask.countdown).toBeDefined();
    });
  });

  describe('wizard', () => {
    it(`exists as 'ask.wizard'`, () => {
      expect(swissnode.ask.wizard).toBeDefined();
    });
  });

  describe('date', () => {
    it(`exists as 'ask.date'`, () => {
      expect(swissnode.ask.date).toBeDefined();
    });
  });

  describe('time', () => {
    it(`exists as 'ask.time'`, () => {
      expect(swissnode.ask.time).toBeDefined();
    });
  });

  describe('datetime', () => {
    it(`exists as 'ask.datetime'`, () => {
      expect(swissnode.ask.datetime).toBeDefined();
    });
  });

  describe('dateRange', () => {
    it(`exists as 'ask.dateRange'`, () => {
      expect(swissnode.ask.dateRange).toBeDefined();
    });
  });

  describe('fileExplorer', () => {
    it(`exists as 'ask.fileExplorer'`, () => {
      expect(swissnode.ask.fileExplorer).toBeDefined();
    });
  });

  describe('multiFileExplorer', () => {
    it(`exists as 'ask.multiFileExplorer'`, () => {
      expect(swissnode.ask.multiFileExplorer).toBeDefined();
    });
  });

  describe('saveFileExplorer', () => {
    it(`exists as 'ask.saveFileExplorer'`, () => {
      expect(swissnode.ask.saveFileExplorer).toBeDefined();
    });
  });

  describe('select', () => {
    it(`exists as 'table.select'`, () => {
      expect(swissnode.ask.table.select).toBeDefined();
    });
  });

  describe('multiselect', () => {
    it(`exists as 'table.multiselect'`, () => {
      expect(swissnode.ask.table.multiselect).toBeDefined();
    });
  });

  describe('trim', () => {
    it(`exists as 'ask.trim'`, () => {
      expect(swissnode.ask.trim).toBeDefined();
    });
  });

  describe('separator', () => {
    it(`exists as 'ask.separator'`, () => {
      expect(swissnode.ask.separator).toBeDefined();
    });
  });

  describe('section', () => {
    it(`exists as 'ask.section'`, () => {
      expect(swissnode.ask.section).toBeDefined();
    });
  });

  describe('utils', () => {
    it(`exists as 'ask.utils'`, () => {
      expect(swissnode.ask.utils).toBeDefined();
    });

    describe('itemsToPromptObjects', () => {
      it(`exists as 'ask.utils.itemsToPromptObjects'`, () => {
        expect(swissnode.ask.utils.itemsToPromptObjects).toBeDefined();
      });
    });
  });
});
