/**
 * @file Examples - DateCommand
 * @module examples/dateformat/DateCommand
 */

import {
  CliUtilityService,
  Command,
  CommandRunner,
  Option
} from '@flex-development/nest-commander'
import type * as commander from '@flex-development/nest-commander/commander'
import { get, includes, keys } from '@flex-development/tutils'
import dateformat, { masks } from 'dateformat'
import TimezoneCommand from './timezone.command'

/**
 * Parsed command options.
 */
interface Opts {
  /**
   * Convert local time to GMT time.
   */
  gmt: boolean

  /**
   * Date format.
   *
   * @default 'ddd mmm dd yyyy HH:MM:ss'
   */
  mask: string

  /**
   * Convert local time to UTC time.
   */
  utc: boolean
}

/**
 * Date formatter command model.
 *
 * @class
 * @extends {CommandRunner}
 */
@Command({
  arguments: { description: 'date string or timestamp', syntax: '[date]' },
  description: 'https://github.com/felixge/node-dateformat',
  examples: ['', '--mask=isoTime'],
  name: 'dateformat',
  root: true,
  subcommands: [TimezoneCommand]
})
class DateCommand extends CommandRunner {
  /**
   * Creates a new `dateformat` command runner.
   *
   * @param {CliUtilityService} util - Utilities service instance
   */
  constructor(protected readonly util: CliUtilityService) {
    super()
  }

  /**
   * Parses the `--gmt` flag.
   *
   * @see {@linkcode Opts.gmt}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    conflicts: 'utc',
    description: 'convert local time to gmt time',
    fallback: { value: false },
    flags: '-g, --gmt',
    preset: 'true'
  })
  protected parseGMT(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Parses the `--mask` flag.
   *
   * @see {@linkcode Opts.mask}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string} Parsed option value
   */
  @Option({
    description: 'date format',
    fallback: { value: masks.default },
    flags: '-m, --mask <mask>'
  })
  protected parseMask(val: string): string {
    return includes(keys(masks), val) ? get(masks, val) : val
  }

  /**
   * Parses the `--utc` flag.
   *
   * @see {@linkcode Opts.utc}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    conflicts: 'gmt',
    description: 'convert local time to utc time',
    fallback: { value: false },
    flags: '-u, --utc',
    preset: 'true'
  })
  protected parseUTC(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Command action handler.
   *
   * @public
   *
   * @param {[string?, ...string[]]} args - Parsed command arguments
   * @param {Opts} opts - Parsed command options
   * @return {void} Nothing when complete
   */
  public run(args: [string?, ...string[]], opts: Opts): void {
    return void console.log(dateformat(args[0], opts.mask, opts.utc, opts.gmt))
  }

  /**
   * Set the current command.
   *
   * @see {@linkcode command}
   *
   * @public
   * @override
   *
   * @param {commander.Command} cmd - New command instance
   * @return {this} `this` command runner
   */
  public override setCommand(cmd: commander.Command): this {
    cmd.showHelpAfterError()
    return super.setCommand(cmd)
  }
}

export default DateCommand
