/**
 * @file Models - Program
 * @module nest-commander/models/Program
 */

import { Command, type ParseOptions } from '#src/commander'
import {
  cast,
  fallback,
  get,
  includes,
  keys,
  type Nilable,
  type Optional
} from '@flex-development/tutils'
import ProgramOptions from './options-program.model'

/**
 * CLI program model.
 *
 * @see {@linkcode Command}
 *
 * @class
 * @extends {Command}
 */
class Program extends Command {
  /**
   * Program configuration options.
   *
   * @see {@linkcode ProgramOptions}
   *
   * @public
   * @readonly
   * @instance
   * @member {Readonly<Required<ProgramOptions>>} config
   */
  public readonly config: Readonly<Required<ProgramOptions>>

  /**
   * Parent command.
   *
   * @public
   * @override
   * @readonly
   * @instance
   * @member {null} parent
   */
  public override readonly parent: null

  /**
   * Creates a new CLI program instance.
   *
   * @see {@linkcode ProgramOptions}
   *
   * @param {ProgramOptions?} [options] - Program options
   * @param {string?} [options.name] - Program name
   */
  constructor(options?: ProgramOptions & { name?: string }) {
    super(get(options, 'name'))
    this.config = cast(Object.freeze(new ProgramOptions(options)))
    this.parent = null

    // configure argument and option parsing
    this.allowExcessArguments(this.config.excess)
    this.allowUnknownOption(this.config.unknown)
    this.combineFlagAndOptionalValue(this.config.combine)
    this.enablePositionalOptions(this.config.positional)
    this.passThroughOptions(this.config.passthrough)

    // configure exit override
    this.exitOverride(this.config.exit)

    // configure program version
    if (keys(this.config.version).length) {
      this.version(
        get(this.config.version, 'version', cast<string>(this.config.version)),
        get(this.config.version, 'flags'),
        get(this.config.version, 'description')
      )
    }
  }

  /**
   * Copy common settings to `command`.
   *
   * @public
   *
   * @param {Command} command - Command to copy settings to
   * @return {typeof command} Updated `command`
   */
  public enforceSettings(command: Command): typeof command {
    command.allowUnknownOption(this.config.unknown)
    command.passThroughOptions(this.config.passthrough)
    return command.copyInheritedSettings(this)
  }

  /**
   * Find a command by name or alias.
   *
   * @public
   *
   * @param {Nilable<string>} cmd - Command name or alias
   * @param {Command?} [parent=this] - Parent command
   * @return {Optional<Command>} Command named `name` or `undefined`
   */
  public findCommand(
    cmd: Nilable<string>,
    parent: Command = this
  ): Optional<Command> {
    return parent.commands.find(command => {
      return command.name() === cmd || includes(command.aliases(), cmd)
    })
  }

  /**
   * Parse `argv`, setting options and invoking commands when defined, as well
   * as calling the `done` ({@linkcode ProgramOptions.done}) callback when
   * parsing complete.
   *
   * The default expectation is that arguments are from `node` and have the
   * application as `argv[0]` and current script as `argv[1]`, with any user
   * parameters thereafter. This behavior can be changed with `options.from`.
   *
   * @see https://github.com/tj/commander.js#parse-and-parseasync
   *
   * @public
   * @override
   * @async
   *
   * @param {ReadonlyArray<string>?} [argv=process.argv] - CLI arguments
   * @param {ParseOptions?} [options] - CLI argument parsing options
   * @param {ParseOptions['from']} options.from - CLI arguments source
   * @return {Promise<this>} CLI program instance
   */
  public override async parseAsync(
    argv: readonly string[] = process.argv,
    options?: ParseOptions
  ): Promise<this> {
    // parse command-line arguments
    await super.parseAsync(argv, options)

    /**
     * Command that was run.
     *
     * @const {Command} command
     */
    const command: Command = fallback(this.findCommand(this.args[0]), this)

    // run post-parse callback
    await this.config.done(command.args, command.optsWithGlobals(), command)

    return this
  }
}

export default Program
