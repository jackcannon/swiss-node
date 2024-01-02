import * as swissnode from '../';
import { register, should, singleTest, multiTest, kitchenSink } from './test-utils';

register({ describe, it, expect });

describe('PathTools', () => {
  describe('explodePath', () => {
    multiTest(
      [
        [swissnode.PathTools.explodePath, 'PathTools.explodePath'],
        [swissnode.explodePath, 'explodePath']
      ],
      (explodePath, name) => {
        it(should` exist as ${name}`, () => {
          expect(explodePath).toBeDefined();
        });

        // TODO tests
        // TODO add arg safety
        // TODO kitchenSink
      }
    );
  });

  describe('removeTrailSlash', () => {
    singleTest(swissnode.PathTools.removeTrailSlash, 'PathTools.removeTrailSlash', (removeTrailSlash, name) => {
      it(should` exist as ${name}`, () => {
        expect(removeTrailSlash).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('trailSlash', () => {
    singleTest(swissnode.PathTools.trailSlash, 'PathTools.trailSlash', (trailSlash, name) => {
      it(should` exist as ${name}`, () => {
        expect(trailSlash).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });

  describe('removeDoubleSlashes', () => {
    singleTest(swissnode.PathTools.removeDoubleSlashes, 'PathTools.removeDoubleSlashes', (removeDoubleSlashes, name) => {
      it(should` exist as ${name}`, () => {
        expect(removeDoubleSlashes).toBeDefined();
      });

      // TODO tests
      // TODO add arg safety
      // TODO kitchenSink
    });
  });
});
