/**
 * @file commander - Command
 * @module nest-commander/commander/Command
 */

import {
  cast,
  define,
  fallback,
  get,
  isEmptyString,
  isFalsy,
  isUndefined,
  trim,
  unique,
  type IfUndefined,
  type Nullable,
  type Optional
} from '@flex-development/tutils'
import { Command as CommandBase, type CommandOptions } from 'commander'
import Example from './example'

/**
 * CLI command model.
 *
 * @see {@linkcode CommandBase}
 *
 * @extends {CommandBase}
 */
class Command extends CommandBase {
  /**
   * Attached subcommands.
   *
   * @public
   * @override
   * @readonly
   * @member {Command[]} commands
   */
  public override readonly commands: Command[]

  /**
   * Command examples.
   *
   * @public
   * @override
   * @readonly
   * @member {Example[]} examples
   */
  public readonly examples: Example[]

  /**
   * Parent command.
   *
   * @public
   * @override
   * @readonly
   * @member {Nullable<Command>} parent
   */
  public override parent: Nullable<Command>

  /**
   * Creates a new command instance.
   *
   * @param {string?} [cmd] - Command name
   */
  constructor(cmd?: string) {
    super(cmd)
    this.commands = []
    this.examples = []
    this.parent = null
  }

  /**
   * Add a prepared subcommand.
   *
   * See {@linkcode command} for creating an attached subcommand that inherits
   * settings from its parent.
   *
   * @see {@linkcode CommandBase}
   * @see {@linkcode CommandOptions}
   *
   * @public
   * @override
   *
   * @param {Command} cmd - Command instance
   * @param {CommandOptions?} [opts] - Command options
   * @param {boolean?} [opts.hidden] - Remove command from help text
   * @param {boolean?} [opts.isDefault] - Mark command as root command
   * @return {this} `this` command for chaining
   */
  public override addCommand(cmd: Command, opts?: CommandOptions): this {
    return super.addCommand(cmd, opts)
  }

  /**
   * Create a new unattached command.
   *
   * @public
   * @override
   *
   * @param {string?} [name] - Command name
   * @return {Command} New command
   */
  public override createCommand(name?: string): Command {
    return new Command(name)
  }

  /**
   * Add a new example.
   *
   * @public
   *
   * @param {string?} [text=''] - Example text
   * @param {string?} [prefix=''] - Example text prefix
   * @return {this} `this` command for chaining
   */
  public example(text: string = '', prefix: string = ''): this {
    return define(this, 'examples', {
      value: unique([
        ...this.examples,
        new Example(
          !text.startsWith(this.alias()) && !text.startsWith(this.name())
            ? `${this.name()} ${text}`.replaceAll(/ +$/g, '')
            : text,
          prefix
        )
      ])
    })
  }

  /**
   * Get `this` command version, or modify the existing version configuration.
   *
   * Flags `--version` and `-v` are auto-registered if option `flags` are not
   * specified.
   *
   * @public
   * @override
   *
   * @template V - Command version
   *
   * @param {V?} [version] - Command version
   * @param {string?} [flags='-v, --version'] - Option flags
   * @param {string?} [description='print version number'] - Option description
   * @return {IfUndefined<V, string, this>} Current command version if `version`
   * is not passed, or `this` command for chaining
   */
  public override version<V extends Optional<string> = undefined>(
    version?: V,
    flags?: string,
    description?: string
  ): IfUndefined<V, string, this> {
    return cast(
      isUndefined(version)
        ? get(this, '_version')
        : isEmptyString((version = cast(trim(version))))
        ? this
        : super.version(
            version!,
            fallback(flags, '-v, --version', isFalsy),
            fallback(description, 'print version number', isFalsy)
          )
    )
  }
}

export default Command
