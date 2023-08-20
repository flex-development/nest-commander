/**
 * @file Providers - CommandRunnerService
 * @module nest-commander/providers/CommandRunnerService
 */

import { MetadataKey } from '#src/enums'
import type {
  CommandMetadata,
  OptionMetadata,
  RunnerMetadata
} from '#src/metadata'
import { Program, ProgramOptions } from '#src/models'
import type { DiscoveredCommand } from '#src/types'
import {
  cast,
  constant,
  define,
  entries,
  fallback,
  flat,
  get,
  isString,
  isUndefined,
  lowercase,
  pick,
  select,
  type Optional
} from '@flex-development/tutils'
import { DiscoveryService } from '@golevelup/nestjs-discovery'
import { Injectable, type OnModuleInit } from '@nestjs/common'
import { Argument, Command, Option, type ParseOptions } from 'commander'
import HelpService from './help.service'

/**
 * Encapsulates logic used to create and run CLI commands.
 *
 * @class
 * @implements {OnModuleInit}
 */
@Injectable()
class CommandRunnerService implements OnModuleInit {
  /**
   * Discovered commands.
   *
   * @protected
   * @instance
   * @member {DiscoveredCommand[]} commands
   */
  protected commands: DiscoveredCommand[]

  /**
   * Discovered subcommands.
   *
   * @protected
   * @instance
   * @member {DiscoveredCommand[]} subcommands
   */
  protected subcommands: DiscoveredCommand[]

  /**
   * Creates a new command runner service.
   *
   * @param {DiscoveryService} discovery - Discovery service instance
   * @param {Program} program - CLI program instance
   * @param {ProgramOptions} options - CLI program options
   * @param {HelpService} help - Help service instance
   */
  constructor(
    protected readonly discovery: DiscoveryService,
    protected readonly program: Program,
    protected readonly options: ProgramOptions,
    protected readonly help: HelpService
  ) {
    this.commands = []
    this.subcommands = []
  }

  /**
   * Initializes a {@linkcode Command} instance.
   *
   * @see {@linkcode RunnerMetadata}
   *
   * @protected
   * @async
   *
   * @param {RunnerMetadata} metadata - Command runner metadata
   * @param {Command} [command=new Command()] - Command to initialize
   * @return {Promise<Command>} Initialized `command`
   */
  protected async command(
    metadata: RunnerMetadata,
    command: Command = new Command()
  ): Promise<Command> {
    // set current command instance on command runner
    metadata.instance.setCommand(this.program.enforceSettings(command))

    // add command name, description, and aliases
    command.name(metadata.command.name)
    command.description(fallback(metadata.command.description, ''))
    command.aliases(fallback(metadata.command.aliases, []))

    // customize help
    command.createHelp = constant(this.help)

    // add command arguments
    if (!isUndefined(metadata.command.arguments)) {
      const { arguments: args } = metadata.command

      for (const arg of isString(args) ? [{ syntax: args }] : flat([args])) {
        /**
         * Command argument instance.
         *
         * @const {Argument} argument
         */
        const argument: Argument = new Argument(
          arg.syntax,
          arg.description
        ).default(get(arg, 'fallback.value'), get(arg, 'fallback.description'))

        // add argument choices
        arg.choices?.length && argument.choices(arg.choices)

        // add argument to command
        command.addArgument(argument)
      }
    }

    // add command options
    for (const { discoveredMethod: method, meta } of metadata.options) {
      const {
        choices = [],
        conflicts = [],
        description = '',
        env,
        fallback = {},
        flags,
        hidden = false,
        implies = {},
        mandatory = false,
        preset
      } = meta

      /**
       * Command option instance.
       *
       * @const {Option} option
       */
      const option: Option = new Option(flags, description)
        .conflicts(conflicts)
        .default(fallback.value, fallback.description)
        .hideHelp(hidden)
        .implies(implies)
        .makeOptionMandatory(mandatory)
        .preset(preset)

      // configure environment variable
      env && option.env(env)

      // configure option choices
      choices.length && option.choices(choices)

      // add option-argument parser
      option.argParser(method.handler.bind(metadata.instance))

      // add command option
      command.addOption(option)
    }

    // register command callback
    command.action(async function action(this: Command): Promise<void> {
      metadata.instance.run.bind(metadata.instance)
      return metadata.instance.run(this.args, this.opts())
    })

    // add subcommands
    if (metadata.command.subcommands?.length && this.subcommands.length) {
      /**
       * Subcommands for {@linkcode command}.
       *
       * @const {DiscoveredCommand[]} subcommands
       */
      const subcommands: DiscoveredCommand[] = select(
        this.subcommands,
        (provider: DiscoveredCommand): provider is DiscoveredCommand => {
          return metadata.command.subcommands!.some(subcommand => {
            return subcommand.name === provider.discoveredClass.name
          })
        }
      )

      // add subcommands to command
      for (const m of await this.metadata(subcommands)) {
        command.addCommand(await this.command(m), {
          hidden: !!m.command.hidden,
          isDefault: !!m.command.root
        })
      }
    }

    return command
  }

  /**
   * Returns an array containing command runner metadata.
   *
   * @protected
   * @async
   *
   * @param {DiscoveredCommand[]} providers - Command providers
   * @return {Promise<RunnerMetadata[]>} Command runner metadata array
   */
  protected async metadata(
    providers: DiscoveredCommand[]
  ): Promise<RunnerMetadata[]> {
    /**
     * Command runner metadata.
     *
     * @const {RunnerMetadata[]} metadata
     */
    const metadata: RunnerMetadata[] = []

    // get runner metadata
    for (const { meta: command, discoveredClass } of providers) {
      metadata.push({
        command,
        instance: cast(discoveredClass.instance),
        options:
          await this.discovery.providerMethodsWithMetaAtKey<OptionMetadata>(
            MetadataKey.OPTION,
            found => found.name === discoveredClass.name
          )
      })
    }

    return metadata
  }

  /**
   * Initializes the runner service.
   *
   * @public
   * @async
   *
   * @return {Promise<void>} Nothing when complete
   */
  public async onModuleInit(): Promise<void> {
    // discover commands and subcommands
    for (const keys of entries(pick(MetadataKey, ['COMMAND', 'SUBCOMMAND']))) {
      define(this, lowercase(`${keys[0]}s`), {
        value: await this.discovery.providersWithMetaAtKey<CommandMetadata>(
          keys[1]
        )
      })
    }

    /**
     * Array containing command runner metadata.
     *
     * @const {RunnerMetadata[]} metadata
     */
    const metadata: RunnerMetadata[] = await this.metadata(this.commands)

    /**
     * Default command runner metadata.
     *
     * @const {Optional<RunnerMetadata>} root
     */
    const root: Optional<RunnerMetadata> = metadata.find(m => !!m.command.root)

    // apply root command metadata to program
    if (root) await this.command(root, this.program)

    // add commands
    for (const m of metadata) {
      if (m.command.root) continue
      this.program.addCommand(await this.command(m), m.command)
    }

    return void metadata
  }

  /**
   * Run {@linkcode program}.
   *
   * @public
   * @async
   *
   * @param {ReadonlyArray<string>?} [argv=process.argv] - Command arguments
   * @param {ParseOptions?} [options] - Command argument parsing options
   * @param {ParseOptions['from']} options.from - Command arguments source
   * @return {Promise<void>} Nothing when complete
   */
  public async run(
    argv: readonly string[] = process.argv,
    options?: ParseOptions
  ): Promise<void> {
    await this.program.parseAsync(argv, options).catch(this.options.error)
    return void argv
  }
}

export default CommandRunnerService
