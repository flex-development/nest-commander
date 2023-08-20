/**
 * @file Providers - HelpService
 * @module nest-commander/providers/HelpService
 */

import { fallback, flat, fork, includes } from '@flex-development/tutils'
import { Injectable } from '@nestjs/common'
import * as commander from 'commander'

/**
 * Encapsulates logic for displaying help text.
 *
 * @see {@linkcode commander.Help}
 *
 * @class
 * @extends {commander.Help}
 */
@Injectable()
class HelpService extends commander.Help {
  /**
   * Maximum output text width.
   *
   * Long lines are wrapped to fit.
   *
   * @default fallback(process.stdout.columns, 100)
   *
   * @public
   * @override
   * @instance
   * @member {number} helpWidth
   */
  public override helpWidth: number

  /**
   * Indentation size (in single-spaced characters).
   *
   * @public
   * @instance
   * @member {number} indent
   */
  public indent: number

  /**
   * Maximum number of characters per line.
   *
   * @public
   * @instance
   * @member {number} linewidth
   */
  public linewidth: number

  /**
   * Creates a new help service instance.
   */
  constructor() {
    super()
    this.helpWidth = fallback(process.stdout.columns, 100)
    this.indent = 2
    this.linewidth = this.helpWidth - this.indent
    this.sortOptions = true
    this.sortSubcommands = true
  }

  /**
   * Returns an array containing visible subcommands.
   *
   * If visible, the `help` command will **always** be the last subcommand.
   *
   * @public
   * @override
   *
   * @param {commander.Command} cmd - Command instance
   * @return {commander.Command[]} Visible subcommands array
   */
  public override visibleCommands(cmd: commander.Command): commander.Command[] {
    return flat(
      fork(
        super.visibleCommands(cmd),
        subcommand => subcommand.name() !== 'help'
      )
    )
  }

  /**
   * Returns an array containing visible command options.
   *
   * If visible, the `--help` and `--version` flags will **always** be the last
   * two options.
   *
   * @public
   * @override
   *
   * @param {commander.Command} cmd - Command instance
   * @return {commander.Option[]} Visible command options array
   */
  public override visibleOptions(cmd: commander.Command): commander.Option[] {
    return flat(
      fork(
        super.visibleOptions(cmd),
        option => !includes(['help', 'version'], option.name())
      )
    )
  }
}

export default HelpService
