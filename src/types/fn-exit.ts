/**
 * @file Type Definitions - ExitFn
 * @module nest-commander/types/ExitFn
 */

import type * as commander from '#src/commander'
import type { Fn } from '@flex-development/tutils'

/**
 * Callback used as a replacement for calling {@linkcode process.exit}.
 *
 * @see {@linkcode commander.CommanderError}
 * @see https://github.com/tj/commander.js#override-exit-and-output-handling
 *
 * @param {commander.CommanderError} error - Error thrown
 * @return {void} Nothing when complete
 */
type ExitFn = Fn<[error: commander.CommanderError], void>

export type { ExitFn as default }
