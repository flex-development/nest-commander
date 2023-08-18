/**
 * @file Models - ProgramOptions
 * @module nest-commander/models/ProgramOptions
 */

import type { VersionOptions } from '#src/interfaces'
import type { DoneFn, ErrorFn, ExitFn } from '#src/types'
import { fallback, noop } from '@flex-development/tutils'
import type { LogLevel, LoggerService } from '@nestjs/common'
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface'

/**
 * CLI program options.
 *
 * @see {@linkcode NestApplicationContextOptions}
 *
 * @class
 * @extends {NestApplicationContextOptions}
 */
class ProgramOptions extends NestApplicationContextOptions {
  /**
   * Alter parsing of short flags with optional values.
   *
   * @see https://github.com/tj/commander.js#options
   *
   * @default false
   *
   * @public
   * @instance
   * @member {boolean?} combine
   */
  public combine?: boolean

  /**
   * Function to call after program is ran.
   *
   * @see {@linkcode DoneFn}
   *
   * @public
   * @instance
   * @member {DoneFn?} done
   */
  public done?: DoneFn

  /**
   * Handles an error thrown by a command.
   *
   * @see {@linkcode ErrorFn}
   *
   * @public
   * @instance
   * @member {ErrorFn?} error
   */
  public error?: ErrorFn

  /**
   * Allow excess command-arguments on the command line.
   *
   * @see https://github.com/tj/commander.js#action-handler
   *
   * @default false
   *
   * @public
   * @instance
   * @member {boolean?} excess
   */
  public excess?: boolean

  /**
   * Callback to use as replacement for calling {@linkcode process.exit}.
   *
   * @see {@linkcode ExitFn}
   *
   * @public
   * @instance
   * @member {ExitFn?} exit
   */
  public exit?: ExitFn

  /**
   * Logger to use.
   *
   * Pass `false` to turn off logging.
   *
   * @see {@linkcode LogLevel}
   * @see {@linkcode LoggerService}
   *
   * @default ['error','warn']
   *
   * @public
   * @instance
   * @override
   * @member {(LoggerService | LogLevel[] | false)?} logger
   */
  public override logger?: LoggerService | LogLevel[] | false

  /**
   * Only process options that come before command arguments.
   *
   * @see https://github.com/tj/commander.js#parsing-configuration
   *
   * @default false
   *
   * @public
   * @instance
   * @member {boolean?} passthrough
   */
  public passthrough?: boolean

  /**
   * Only look for program options before subcommands.
   *
   * @see https://github.com/tj/commander.js#parsing-configuration
   *
   * @default true
   *
   * @public
   * @instance
   * @member {boolean?} positional
   */
  public positional?: boolean

  /**
   * Allow unknown options on the command line.
   *
   * @see https://github.com/tj/commander.js#parsing-configuration
   *
   * @default false
   *
   * @public
   * @instance
   * @member {boolean?}
   */
  public unknown?: boolean

  /**
   * Program version options.
   *
   * @see {@linkcode VersionOptions}
   *
   * @default ''
   *
   * @public
   * @instance
   * @member {(VersionOptions | VersionOptions['version'])?} version
   */
  public version?: VersionOptions | VersionOptions['version']

  /**
   * Creates new program options object.
   *
   * @param {Partial<ProgramOptions>} [options={}] - CLI program options
   */
  constructor(options: Partial<ProgramOptions> = {}) {
    super()

    const {
      abortOnError,
      autoFlushLogs,
      bufferLogs,
      combine,
      done,
      error,
      excess,
      exit,
      logger,
      passthrough,
      positional,
      preview,
      snapshot,
      unknown,
      version
    } = options

    this.abortOnError = fallback(abortOnError, true)
    this.autoFlushLogs = fallback(autoFlushLogs, true)
    this.bufferLogs = fallback(bufferLogs, false)
    this.combine = fallback(combine, false)
    this.done = fallback(done, noop)
    this.error = fallback(error, e => console.error(e.toString()))
    this.excess = fallback(excess, false)
    this.exit = fallback(exit, e => process.exit(e.exitCode))
    this.logger = fallback(logger, ['error', 'warn'])
    this.passthrough = fallback(passthrough, false)
    this.positional = fallback(positional, true)
    this.preview = fallback(preview, false)
    this.snapshot = fallback(snapshot, false)
    this.unknown = fallback(unknown, false)
    this.version = fallback(version, '')
  }
}

export default ProgramOptions
