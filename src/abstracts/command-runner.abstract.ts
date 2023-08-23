/**
 * @file Abstracts - CommandRunner
 * @module nest-commander/abstracts/CommandRunner
 */

import type * as commander from '#src/commander'

/**
 * Encapsulates command action logic.
 *
 * @abstract
 * @class
 */
abstract class CommandRunner {
  /**
   * Command instance.
   *
   * @see {@linkcode commander.Command}
   *
   * @protected
   * @instance
   * @member {commander.Command} command
   */
  protected command!: commander.Command

  /**
   * Set the current command.
   *
   * @see {@linkcode command}
   *
   * @public
   *
   * @param {commander.Command} cmd - New command instance
   * @return {this} `this` command runner
   */
  public setCommand(cmd: commander.Command): this {
    this.command = cmd
    return this
  }

  /**
   * Run the command.
   *
   * @public
   * @abstract
   *
   * @param {commander.Command['args']} args - Parsed command arguments
   * @param {commander.OptionValues} options - Parsed command options
   * @return {Promise<void> | void} Nothing when complete
   */
  public abstract run(
    args: commander.Command['args'],
    options: commander.OptionValues
  ): Promise<void> | void
}

export default CommandRunner
