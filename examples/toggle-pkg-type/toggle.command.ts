/**
 * @file Examples - ToggleCommand
 * @module examples/toggle-pkg-type/ToggleCommand
 */

import {
  Command,
  CommandRunner,
  Option
} from '@flex-development/nest-commander'
import type * as commander from '@flex-development/nest-commander/commander'
import toggle from '@flex-development/toggle-pkg-type'
import { DOT, cast } from '@flex-development/tutils'

/**
 * Parsed command options.
 */
interface Opts {
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
  examples: [
    '',
    'on',
    'off',
    { prefix: 'npm_package_json=/path/to/directory/or/manifest' }
  ],
  name: 'toggle-pkg-type',
  root: true
})
class ToggleCommand extends CommandRunner {
  /**
   * Parses the `--id` flag.
   *
   * @see {@linkcode Opts.id}
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
   * @see {@linkcode Opts}
   * @see {@linkcode toggle}
   *
   * @public
   *
   * @param {[string?, ...string[]]} args - Parsed command arguments
   * @param {Opts} opts - Parsed command options
   * @return {void} Nothing when complete
   */
  public run(args: [string?, ...string[]], opts: Opts): void {
    return void toggle(cast(args[0]), opts.id)
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

export default ToggleCommand
