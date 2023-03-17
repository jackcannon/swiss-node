/**<!-- DOCS: ## -->
 * waiters
 */

/**<!-- DOCS: ### -->
 * nextTick
 *
 * - `nextTick`
 *
 * Wait for the next tick
 *
 * ```typescript
 * wait nextTick();
 * ```
 */
export const nextTick = () => new Promise((resolve) => process.nextTick(() => resolve(undefined)));
