import * as swissnode from '../';
import { register, should, singleTest, multiTest, kitchenSink } from './test-utils';

register({ describe, it, expect });

describe('ask', () => {
  describe('text', () => {
    singleTest(swissnode.ask.text, 'ask.text', (text, name) => {
      it(should` exist as ${name}`, () => {
        expect(text).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('autotext', () => {
    singleTest(swissnode.ask.autotext, 'ask.autotext', (autotext, name) => {
      it(should` exist as ${name}`, () => {
        expect(autotext).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('number', () => {
    singleTest(swissnode.ask.number, 'ask.number', (number, name) => {
      it(should` exist as ${name}`, () => {
        expect(number).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('boolean', () => {
    singleTest(swissnode.ask.boolean, 'ask.boolean', (boolean, name) => {
      it(should` exist as ${name}`, () => {
        expect(boolean).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('booleanAlt', () => {
    singleTest(swissnode.ask.booleanAlt, 'ask.booleanAlt', (booleanAlt, name) => {
      it(should` exist as ${name}`, () => {
        expect(booleanAlt).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('select', () => {
    singleTest(swissnode.ask.select, 'ask.select', (select, name) => {
      it(should` exist as ${name}`, () => {
        expect(select).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('multiselect', () => {
    singleTest(swissnode.ask.multiselect, 'ask.multiselect', (multiselect, name) => {
      it(should` exist as ${name}`, () => {
        expect(multiselect).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('crud', () => {
    singleTest(swissnode.ask.crud, 'ask.crud', (crud, name) => {
      it(should` exist as ${name}`, () => {
        expect(crud).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('validate', () => {
    singleTest(swissnode.ask.validate, 'ask.validate', (validate, name) => {
      it(should` exist as ${name}`, () => {
        expect(validate).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('imitate', () => {
    singleTest(swissnode.ask.imitate, 'ask.imitate', (imitate, name) => {
      it(should` exist as ${name}`, () => {
        expect(imitate).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('prefill', () => {
    singleTest(swissnode.ask.prefill, 'ask.prefill', (prefill, name) => {
      it(should` exist as ${name}`, () => {
        expect(prefill).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('loading', () => {
    singleTest(swissnode.ask.loading, 'ask.loading', (loading, name) => {
      it(should` exist as ${name}`, () => {
        expect(loading).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('pause', () => {
    singleTest(swissnode.ask.pause, 'ask.pause', (pause, name) => {
      it(should` exist as ${name}`, () => {
        expect(pause).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('countdown', () => {
    singleTest(swissnode.ask.countdown, 'ask.countdown', (countdown, name) => {
      it(should` exist as ${name}`, () => {
        expect(countdown).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('wizard', () => {
    singleTest(swissnode.ask.wizard, 'ask.wizard', (wizard, name) => {
      it(should` exist as ${name}`, () => {
        expect(wizard).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('date', () => {
    singleTest(swissnode.ask.date, 'ask.date', (date, name) => {
      it(should` exist as ${name}`, () => {
        expect(date).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('time', () => {
    singleTest(swissnode.ask.time, 'ask.time', (time, name) => {
      it(should` exist as ${name}`, () => {
        expect(time).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('datetime', () => {
    singleTest(swissnode.ask.datetime, 'ask.datetime', (datetime, name) => {
      it(should` exist as ${name}`, () => {
        expect(datetime).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('dateRange', () => {
    singleTest(swissnode.ask.dateRange, 'ask.dateRange', (dateRange, name) => {
      it(should` exist as ${name}`, () => {
        expect(dateRange).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('fileExplorer', () => {
    singleTest(swissnode.ask.fileExplorer, 'ask.fileExplorer', (fileExplorer, name) => {
      it(should` exist as ${name}`, () => {
        expect(fileExplorer).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('multiFileExplorer', () => {
    singleTest(swissnode.ask.multiFileExplorer, 'ask.multiFileExplorer', (multiFileExplorer, name) => {
      it(should` exist as ${name}`, () => {
        expect(multiFileExplorer).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('saveFileExplorer', () => {
    singleTest(swissnode.ask.saveFileExplorer, 'ask.saveFileExplorer', (saveFileExplorer, name) => {
      it(should` exist as ${name}`, () => {
        expect(saveFileExplorer).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('select', () => {
    singleTest(swissnode.ask.table.select, 'ask.table.select', (select, name) => {
      it(should` exist as ${name}`, () => {
        expect(select).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('multiselect', () => {
    singleTest(swissnode.ask.table.multiselect, 'ask.table.multiselect', (multiselect, name) => {
      it(should` exist as ${name}`, () => {
        expect(multiselect).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('trim', () => {
    singleTest(swissnode.ask.trim, 'ask.trim', (trim, name) => {
      it(should` exist as ${name}`, () => {
        expect(trim).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('separator', () => {
    singleTest(swissnode.ask.separator, 'ask.separator', (separator, name) => {
      it(should` exist as ${name}`, () => {
        expect(separator).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('section', () => {
    singleTest(swissnode.ask.section, 'ask.section', (section, name) => {
      it(should` exist as ${name}`, () => {
        expect(section).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('utils', () => {
    it(should` exist as 'ask.utils'`, () => {
      expect(swissnode.ask.utils).toBeDefined();
    });

    describe('itemsToPromptObjects', () => {
      singleTest(swissnode.ask.utils.itemsToPromptObjects, 'ask.utils.itemsToPromptObjects', (itemsToPromptObjects, name) => {
        it(should` exist as ${name}`, () => {
          expect(itemsToPromptObjects).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      });
    });
  });
});
