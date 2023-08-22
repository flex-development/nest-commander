/**
 * @file Examples - ToggleCommand
 * @module examples/toggle-pkg-type/ToggleCommand
 */

import {
  Command,
  CommandRunner,
  Option
} from '@flex-development/nest-commander'
import toggle from '@flex-development/toggle-pkg-type'
import { DOT, cast } from '@flex-development/tutils'
import type * as commander from 'commander'

/**
 * Parsed command options.
 */
interface Flags {
  /**
   * Path to package directory or manifest.
   *
   * @default DOT
   */
  id: string
}

/**
 * Package type toggle command model.
 *
 * @class
 * @extends {CommandRunner}
 */
@Command({
  arguments: {
    choices: ['off', 'on'],
    description: 'Toggle command',
    syntax: '[cmd]'
  },
  description: 'Toggle type fields in package.json files',
  name: 'toggle-pkg-type',
  root: true
})
class ToggleCommand extends CommandRunner {
  /**
   * Parses the `--id` flag.
   *
   * @see {@linkcode Flags.id}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string} Parsed option value
   */
  @Option({
    description: 'module id of package directory or manifest',
    env: 'npm_package_json',
    fallback: { value: DOT },
    flags: '-i, --id <path>'
  })
  protected parseId(val: string): string {
    return val
  }

  /**
   * Enable or disable the [`type`][1] field in a `package.json` file.
   *
   * Does nothing if a `package.json` file is not found.
   *
   * [1]: https://nodejs.org/api/packages.html#type
   *
   * @see {@linkcode Flags}
   * @see {@linkcode toggle}
   *
   * @public
   *
   * @param {[string?, ...string[]]} args - Command arguments
   * @param {Flags} flags - Command options
   * @return {void} Nothing when complete
   */
  public run(args: [string?, ...string[]], flags: Flags): void {
    return void toggle(cast(args[0]), flags.id)
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

export default ToggleCommand
