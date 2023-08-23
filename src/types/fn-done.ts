/**
 * @file Type Definitions - DoneFn
 * @module nest-commander/types/DoneFn
 */

import type * as commander from '#src/commander'

/**
 * Callback ran after command-line arguments are parsed.
 *
 * @template T - Parsed command options type
 *
 * @param {string[]} argv - Parsed command arguments
 * @param {T} opts - Parsed command options
 * @param {commander.Command} command - Command that was run
 * @return {Promise<void> | void} Nothing when complete
 */
type DoneFn<T extends commander.OptionValues = commander.OptionValues> = (
  argv: string[],
  opts: T,
  command: commander.Command
) => Promise<void> | void

export type { DoneFn as default }
