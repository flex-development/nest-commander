/**
 * @file Abstracts - CommandRunner
 * @module nest-commander/abstracts/CommandRunner
 */

import type * as commander from 'commander'

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
   * @see {@linkcode commander.Command}
   *
   * @public
   *
   * @param {commander.Command} command - New command instance
   * @return {this} `this` command runner
   */
  public setCommand(command: commander.Command): this {
    this.command = command
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
