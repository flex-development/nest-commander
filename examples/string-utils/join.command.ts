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
interface Flags {
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
   * @see {@linkcode Flags.separator}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {Flags['separator']} Parsed option value
   */
  @Option({
    description: 'list item separator',
    fallback: { value: ',' },
    flags: '-s, --separator <choice>'
  })
  protected parseSeparator(val: string): Flags['separator'] {
    return val
  }

  /**
   * Command action handler.
   *
   * @public
   *
   * @param {string[]} args - Command arguments
   * @param {Flags} flags - Parsed command options
   * @return {void} Nothing when complete
   */
  public run(args: string[], flags: Flags): void {
    return void console.log(join(args, flags.separator))
  }

  /**
   * Set the current command instance.
   *
   * @see {@linkcode command}
   *
   * @public
   * @override
   *
   * @param {commander.Command} cmd - Command instance
   * @return {this} `this`
   */
  public override setCommand(cmd: commander.Command): this {
    cmd.showHelpAfterError()
    return super.setCommand(cmd)
  }
}

export default JoinCommand
