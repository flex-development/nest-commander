/**
 * @file Examples - TimezoneCommand
 * @module examples/dateformat/TimezoneCommand
 */

import { CommandRunner, Subcommand } from '@flex-development/nest-commander'
import { at } from '@flex-development/tutils'
import type * as commander from 'commander'
import { formatTimezone } from 'dateformat'

/**
 * Timezone formatter command model.
 *
 * @class
 * @extends {CommandRunner}
 */
@Subcommand({
  aliases: ['tz'],
  arguments: { description: 'date string', syntax: '[date]' },
  description: 'get proper timezone abbreviation or timezone offset',
  name: 'timezone'
})
class TimezoneCommand extends CommandRunner {
  /**
   * Command action handler.
   *
   * @public
   *
   * @param {[string?, ...string[]]} args - Command arguments
   * @return {void} Nothing when complete
   */
  public run(args: [string?, ...string[]]): void {
    return void console.log(formatTimezone(at(args, 0, new Date().toString())))
  }

  /**
   * Sets the current command instance.
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

export default TimezoneCommand
