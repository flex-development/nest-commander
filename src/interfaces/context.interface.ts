/**
 * @file Interfaces - CliApplicationContext
 * @module nest-commander/interfaces/CliApplicationContext
 */

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
   * @param {{ close?: boolean }} [options] - Run options
   * @param {boolean?} [options.close=true] - Close context after running
   * @return {Promise<void>} Noting when complete
   */
  run(options?: { close?: boolean }): Promise<void>
}

export type { CliApplicationContext as default }
