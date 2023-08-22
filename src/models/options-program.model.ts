/**
 * @file Models - ProgramOptions
 * @module nest-commander/models/ProgramOptions
 */

import type { VersionOptions } from '#src/interfaces'
import type { DoneFn, ErrorFn, ExitFn } from '#src/types'
import { fallback, noop } from '@flex-development/tutils'

/**
 * CLI program options.
 *
 * @class
 */
class ProgramOptions {
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
   * Callback ran after command-line arguments are parsed.
   *
   * @see {@linkcode DoneFn}
   *
   * @default noop
   *
   * @public
   * @instance
   * @member {DoneFn<any>?} done
   */
  public done?: DoneFn<any>

  /**
   * Handles an error thrown by a command.
   *
   * @see {@linkcode ErrorFn}
   *
   * @default console.error
   *
   * @public
   * @instance
   * @member {ErrorFn<any>?} error
   */
  public error?: ErrorFn<any>

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
   * @default e => process.exit(e.exitCode)
   *
   * @public
   * @instance
   * @member {ExitFn?} exit
   */
  public exit?: ExitFn

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
    const {
      combine,
      done,
      error,
      excess,
      exit,
      passthrough,
      positional,
      unknown,
      version
    } = options

    this.combine = fallback(combine, false)
    this.done = fallback(done, noop)
    this.error = fallback(error, console.error)
    this.excess = fallback(excess, false)
    this.exit = fallback(exit, e => process.exit(e.exitCode))
    this.passthrough = fallback(passthrough, false)
    this.positional = fallback(positional, true)
    this.unknown = fallback(unknown, false)
    this.version = fallback(version, '')
  }
}

export default ProgramOptions
