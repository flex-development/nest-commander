/**
 * @file Interfaces - CliApplicationContext
 * @module nest-commander/interfaces/CliApplicationContext
 */

import type { ParseOptions } from '#src/commander'
import type { INestApplicationContext } from '@nestjs/common'

/**
 * CLI application context object.
 *
 * @see {@linkcode INestApplicationContext}
 *
 * @extends {INestApplicationContext}
 */
interface CliApplicationContext extends INestApplicationContext {
  /**
   * Run the CLI application.
   *
   * @async
   *
   * @param {{ close?: boolean }} [opts] - Run options
   * @param {boolean?} [opts.close=true] - Close app after running
   * @return {Promise<void>} Noting when complete
   */
  run(opts?: { close?: boolean }): Promise<void>

  /**
   * Run the CLI application with specific arguments.
   *
   * @async
   *
   * @param {ReadonlyArray<string>?} [args] - Command-line arguments
   * @param {Partial<ParseOptions & { close?: boolean }>?} [opts] - Run options
   * @param {boolean?} [opts.close=true] - Close app after running
   * @return {Promise<void>} Noting when complete
   */
  runWith(
    args?: readonly string[],
    opts?: Partial<ParseOptions & { close?: boolean }>
  ): Promise<void>
}

export type { CliApplicationContext as default }
