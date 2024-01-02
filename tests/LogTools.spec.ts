import { get } from 'http';
import * as swissnode from '../';
import { register, should, singleTest, multiTest, kitchenSink } from './test-utils';

register({ describe, it, expect });

describe('LogTools', () => {
  describe('getLogStr', () => {
    multiTest(
      [
        [swissnode.LogTools.getLogStr, 'LogTools.getLogStr'],
        [swissnode.getLogStr, 'getLogStr']
      ],
      (getLogStr, name) => {
        it(should` exist as ${name}`, () => {
          expect(getLogStr).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      }
    );
  });

  describe('processLogContents', () => {
    multiTest(
      [
        [swissnode.LogTools.processLogContents, 'LogTools.processLogContents'],
        [swissnode.processLogContents, 'processLogContents']
      ],
      (processLogContents, name) => {
        it(should` exist as ${name}`, () => {
          expect(processLogContents).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      }
    );
  });

  describe('getLog', () => {
    multiTest(
      [
        [swissnode.LogTools.getLog, 'LogTools.getLog'],
        [swissnode.getLog, 'getLog']
      ],
      (getLog, name) => {
        it(should` exist as ${name}`, () => {
          expect(getLog).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      }
    );
  });
});
