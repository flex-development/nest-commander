/**
 * @file Type Definitions - DoneFn
 * @module nest-commander/types/DoneFn
 */

import type Program from '#src/models/program.model'
import type * as commander from 'commander'

/**
 * Callback ran after CLI program is successfully ran.
 *
 * @template T - Option values type
 *
 * @param {string[]} argv - Command line arguments
 * @param {T} opts - Merged local and global option values
 * @param {Program} program - CLI program instance
 * @return {Promise<void> | void} Nothing when complete
 */
type DoneFn = <T extends commander.OptionValues>(
  argv: string[],
  opts: T,
  program: Program
) => Promise<void> | void

export type { DoneFn as default }
