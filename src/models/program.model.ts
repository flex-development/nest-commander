/**
 * @file Models - Program
 * @module nest-commander/models/Program
 */

import {
  cast,
  get,
  isEmptyString,
  isUndefined,
  keys,
  trim,
  type IfUndefined,
  type Optional
} from '@flex-development/tutils'
import * as commander from 'commander'
import ProgramOptions from './options-program.model'

/**
 * CLI program model.
 *
 * @see {@linkcode commander.Command}
 *
 * @class
 * @extends {commander.Command}
 */
class Program extends commander.Command {
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
   * @param {commander.Command} command - Command to copy settings to
   * @return {typeof command} Updated `command`
   */
  public enforceSettings(command: commander.Command): typeof command {
    command.allowUnknownOption(this.config.unknown)
    command.passThroughOptions(this.config.passthrough)
    return command.copyInheritedSettings(this)
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
   * @param {commander.ParseOptions?} [options] - CLI argument parsing options
   * @param {commander.ParseOptions['from']} options.from - CLI arguments source
   * @return {Promise<this>} CLI program instance
   */
  public override async parseAsync(
    argv: readonly string[] = process.argv,
    options?: commander.ParseOptions
  ): Promise<this> {
    await super.parseAsync(argv, options)
    await this.config.done([...argv], this.optsWithGlobals(), this)
    return this
  }

  /**
   * Get `this` program version, or modify the existing version configuration.
   *
   * Flags `--version` and `-v` are auto-registered if option `flags` are not
   * specified.
   *
   * @public
   * @override
   *
   * @template V - Program version
   *
   * @param {V?} [version] - Program version
   * @param {string?} [flags='-v, --version'] - Option flags
   * @param {string?} [description='print version number'] - Option description
   * @return {IfUndefined<V, string, this>} Current program version if `version`
   * is not passed, or `this` program for chaining
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
            flags || '-v, --version',
            description || 'print version number'
          )
    )
  }
}

export default Program
