/**<!-- DOCS: ## -->
 * waiters
 */

/**<!-- DOCS: ### -->
 * nextTick
 *
 * - `nextTick`
 *
 * Wait for the next tick
 */
export const nextTick = () => new Promise((resolve) => process.nextTick(() => resolve(undefined)));
