/**
 * @file Interfaces - ProgramOptions
 * @module nest-commander/interfaces/ProgramOptions
 */

import type { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface'
import type * as commander from 'commander'
import type VersionOptions from './options-version.interface'

/**
 * CLI program options.
 *
 * @see {@linkcode NestApplicationContextOptions}
 *
 * @extends {NestApplicationContextOptions}
 */
interface ProgramOptions extends NestApplicationContextOptions {
  /**
   * Handles an error thrown by Commander.
   *
   * @see https://github.com/tj/commander.js#override-exit-and-output-handling
   *
   * @param {commander.CommanderError} error - Error thrown
   * @return {void} Nothing when complete
   */
  exit?(error: commander.CommanderError): void

  /**
   * Handles an error thrown by a CLI command.
   *
   * @default err => process.stderr.write(err.toString())
   *
   * @template T - Error type
   *
   * @param {T} error - Error thrown
   * @return {void} Nothing when complete
   */
  onrejected?<T extends Error>(error: T): void

  /**
   * Only process options that come before command arguments.
   *
   * @see https://github.com/tj/commander.js#parsing-configuration
   *
   * @default false
   */
  passthrough?: boolean

  /**
   * Only look for program options before subcommands.
   *
   * @see https://github.com/tj/commander.js#parsing-configuration
   *
   * @default true
   */
  positional?: boolean

  /**
   * Program version options.
   *
   * @see {@linkcode VersionOptions}
   */
  version?: VersionOptions
}

export type { ProgramOptions as default }
