/**
 * @file Abstracts - CommandRunner
 * @module nest-commander/abstracts/CommandRunner
 */

import type * as commander from 'commander'

/**
 * CLI command model.
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
   * Sets the current command instance.
   *
   * @public
   *
   * @param {commander.Command} command - New command instance
   * @return {this} Command runner
   */
  public setCommand(command: commander.Command): this {
    this.command = command
    return this
  }

  /**
   * Runs the command.
   *
   * @public
   * @abstract
   *
   * @param {commander.Command['args']} args - Command arguments
   * @param {commander.OptionValues} options - Command options
   * @return {Promise<void> | void} Nothing when complete
   */
  public abstract run(
    args: commander.Command['args'],
    options: commander.OptionValues
  ): Promise<void> | void
}

export default CommandRunner
