/**<!-- DOCS: waiters ##! -->
 * waiters
 */
export namespace waiters {
  // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

  /**<!-- DOCS: waiters.nextTick ### @ -->
   * nextTick
   *
   * - `nextTick`
   * - `waiters.nextTick`
   *
   * Wait for the next tick
   *
   * ```typescript
   * await nextTick();
   * ```
   * @returns {Promise<unknown>} - Promise that resolves when the next tick is reached
   */
  export const nextTick = () => new Promise((resolve) => process.nextTick(() => resolve(undefined)));
} // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE

/**<!-- DOCS-ALIAS: waiters.nextTick -->*/
export const nextTick = waiters.nextTick;
