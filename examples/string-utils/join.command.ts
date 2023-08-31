/**
 * @file Examples - JoinCommand
 * @module examples/string-utils/JoinCommand
 */

import {
  CliUtilityService,
  Command,
  CommandRunner,
  Option
} from '@flex-development/nest-commander'
import type * as commander from '@flex-development/nest-commander/commander'
import { join } from '@flex-development/tutils'

/**
 * Parsed command options.
 */
interface Opts {
  /**
   * List item separator.
   *
   * @default ','
   */
  separator: string
}

/**
 * Join command model.
 *
 * @class
 * @extends {CommandRunner}
 */
@Command({
  arguments: '[strings...]',
  description: 'convert a list of a string',
  examples: ['hello world --separator=.'],
  name: 'join'
})
class JoinCommand extends CommandRunner {
  /**
   * Creates a new `join` command runner.
   *
   * @param {CliUtilityService} util - Utilities service instance
   */
  constructor(protected readonly util: CliUtilityService) {
    super()
  }

  /**
   * Parses the `--separator` flag.
   *
   * @see {@linkcode Opts.separator}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {Opts['separator']} Parsed option value
   */
  @Option({
    description: 'list item separator',
    fallback: { value: ',' },
    flags: '-s, --separator <choice>'
  })
  protected parseSeparator(val: string): Opts['separator'] {
    return val
  }

  /**
   * Command action handler.
   *
   * @public
   *
   * @param {string[]} args - Parsed command arguments
   * @param {Opts} opts - Parsed command options
   * @return {void} Nothing when complete
   */
  public run(args: string[], opts: Opts): void {
    return void console.log(join(args, opts.separator))
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

export default JoinCommand
