/**
 * @file Providers - HelpService
 * @module nest-commander/providers/HelpService
 */

import { Argument, Command, Help, Option } from '#src/commander'
import {
  cast,
  fallback,
  flat,
  fork,
  ifelse,
  includes,
  join,
  select,
  template,
  trim,
  trimStart,
  type Nullable
} from '@flex-development/tutils'
import { Injectable } from '@nestjs/common'

/**
 * Encapsulates logic for displaying help text.
 *
 * @see {@linkcode Help}
 *
 * @class
 * @extends {Help}
 */
@Injectable()
class HelpService extends Help {
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
   * Indent size in single-spaced characters.
   *
   * @public
   * @instance
   * @member {number} tabsize
   */
  public tabsize: number

  /**
   * Creates a new help service.
   */
  constructor() {
    super()
    this.helpWidth = fallback(process.stdout.columns, 110)
    this.showGlobalOptions = false
    this.sortOptions = true
    this.sortSubcommands = true
    this.tabsize = 2
  }

  /**
   * Format command arguments.
   *
   * @public
   *
   * @param {Command} cmd - Command instance
   * @param {Help?} [helper=this] - Command help instance
   * @return {string} Formatted command arguments
   */
  public formatArguments(cmd: Command, helper: Help = this): string {
    return this.section(
      'Arguments',
      this.formatList(this.visibleArguments(cmd), cmd, helper)
    )
  }

  /**
   * Format a command description.
   *
   * @public
   *
   * @param {Command} cmd - Command instance
   * @return {string} Formatted command description
   */
  public formatDescription(cmd: Command): string {
    return this.section(
      'Description',
      this.wrap(
        this.indent() + this.commandDescription(cmd),
        this.helpWidth,
        this.tabsize
      )
    )
  }

  /**
   * Format command examples.
   *
   * @public
   *
   * @param {Command} cmd - Command instance
   * @return {string} Formatted command examples
   */
  public formatExamples(cmd: Command): string {
    return this.section(
      'Examples',
      cmd.examples.reduce((acc, example) => {
        /**
         * Parent command names.
         *
         * @const {string[]}
         */
        const names: string[] = []

        /**
         * Current comand parent.
         *
         * @var {Nullable<Command>} parent
         */
        let parent: Nullable<Command> = cmd.parent

        // get parent command names
        while (parent) {
          names.unshift(parent.name())
          parent = parent.parent
        }

        return template('{acc}{newline}{wrapped}', {
          acc,
          newline: ifelse(acc, '\n', acc),
          wrapped: this.wrap(
            template('{indent}$ {example}', {
              example: trimStart(`${join(names, ' ')} ${example.toString()}`),
              indent: this.indent()
            }),
            this.helpWidth,
            this.tabsize
          )
        })
      }, '')
    )
  }

  /**
   * Format global options.
   *
   * @public
   *
   * @param {Command} cmd - Command instance
   * @param {Help?} [helper=this] - Command help instance
   * @return {string} Formatted global options
   */
  public formatGlobalOptions(cmd: Command, helper: Help = this): string {
    return this.section(
      'Global Options',
      this.formatList(this.visibleGlobalOptions(cmd), cmd, helper)
    )
  }

  /**
   * Format help text.
   *
   * @public
   * @override
   *
   * @param {Command} cmd - Command instance
   * @return {string} Formatted help text
   */
  public override formatHelp(cmd: Command): string {
    return template('{text}\n', {
      text: trim(
        join(
          select(
            [
              this.formatDescription(cmd),
              this.formatUsage(cmd),
              this.formatExamples(cmd),
              this.formatArguments(cmd),
              this.formatOptions(cmd),
              ifelse(this.showGlobalOptions, this.formatGlobalOptions(cmd), ''),
              this.formatSubcommands(cmd)
            ],
            section => !!section
          ),
          '\n\n'
        )
      )
    })
  }

  /**
   * Convert a list of arguments, options, or subcommands to a formatted list.
   *
   * @public
   *
   * @param {ReadonlyArray<Argument | Command | Option>} list - List to format
   * @param {Command} cmd - Command instance
   * @param {Help?} [helper=this] - Command help instance
   * @return {string} Formatted list
   */
  public formatList(
    list: readonly (Argument | Command | Option)[],
    cmd: Command,
    helper: Help = this
  ): string {
    return list.reduce((acc, item) => {
      return template('{acc}{newline}{wrapped}', {
        acc,
        newline: ifelse(acc, '\n', acc),
        wrapped: this.wrap(
          this.formatListItem(item, cmd, helper),
          this.helpWidth - this.tabsize,
          this.padWidth(cmd, helper) + this.tabsize
        )
      })
    }, '')
  }

  /**
   * Convert an argument, option, or subcommand to a formatted list item.
   *
   * @public
   *
   * @param {Argument | Command | Option} item - Item to format
   * @param {Command} cmd - Command instance
   * @param {Help?} [helper=this] - Command help instance
   * @return {string} Formatted list item
   */
  public formatListItem(
    item: Argument | Command | Option,
    cmd: Command,
    helper: Help = this
  ): string {
    /**
     * Argument, option, or subcommand description.
     *
     * @var {string} description
     */
    let description: string = ''

    /**
     * Argument, option, or subcommand term.
     *
     * @var {string} term
     */
    let term: string = ''

    // get argument description and term
    if (item instanceof Argument) {
      description = this.argumentDescription(item)
      term = this.argumentTerm(item)
    }

    // get subcommand description and term
    if (item instanceof Command) {
      description = this.subcommandDescription(item)
      term = this.subcommandTerm(item)
    }

    // get option description and term
    if (item instanceof Option) {
      description = this.optionDescription(item)
      term = this.optionTerm(item)
    }

    // pad term
    term = term.padEnd(this.padWidth(cmd, helper) + this.tabsize)
    term = term.padStart(term.length + this.tabsize)

    return template('{term}{description}', {
      description: this.wrap(
        description,
        this.helpWidth - term.length,
        term.length
      ),
      term
    })
  }

  /**
   * Format command options.
   *
   * @public
   *
   * @param {Command} cmd - Command instance
   * @param {Help?} [helper=this] - Command help instance
   * @return {string} Formatted command options
   */
  public formatOptions(cmd: Command, helper: Help = this): string {
    return this.section(
      'Options',
      this.formatList(this.visibleOptions(cmd), cmd, helper)
    )
  }

  /**
   * Format subcommands.
   *
   * @public
   *
   * @param {Command} cmd - Command instance
   * @param {Help?} [helper=this] - Command help instance
   * @return {string} Formatted subcommands
   */
  public formatSubcommands(cmd: Command, helper: Help = this): string {
    return this.section(
      'Commands',
      this.formatList(this.visibleCommands(cmd), cmd, helper)
    )
  }

  /**
   * Format command usage.
   *
   * @public
   *
   * @param {Command} cmd - Command instance
   * @return {string} Formatted command usage
   */
  public formatUsage(cmd: Command): string {
    return `Usage\n${this.wrap(
      template('{indent}$ {usage}', {
        indent: this.indent(),
        usage: this.commandUsage(cmd)
      }),
      this.helpWidth,
      this.tabsize
    )}`
  }

  /**
   * Create an indentation string.
   *
   * @public
   *
   * @param {number?} [size=this.indent_size] - Indent size
   * @return {string} Indentation string
   */
  public indent(size: number = this.tabsize): string {
    return ' '.repeat(size)
  }

  /**
   * Get the option term to show in the list of options.
   *
   * @public
   * @override
   *
   * @param {Option} option - Command option instance
   * @return {string} Option term to show in list of options
   */
  public override optionTerm(option: Option): string {
    return option.flags.padStart(option.flags.length + (option.short ? 0 : 4))
  }

  /**
   * Create a help text section.
   *
   * @public
   *
   * @param {string} title - Section title
   * @param {string?} [text=''] - Section content
   * @return {string} Formatted help text section
   */
  public section(title: string, text: string = ''): string {
    return ifelse(trim(text), template('{title}\n{text}', { text, title }), '')
  }

  /**
   * Get an array containing visible subcommands.
   *
   * If visible, the `help` command will **always** be the last subcommand.
   *
   * @public
   * @override
   *
   * @param {Command} cmd - Command instance
   * @return {Command[]} Visible subcommands array
   */
  public override visibleCommands(cmd: Command): Command[] {
    return flat(
      fork(
        cast<Command[]>(super.visibleCommands(cmd)),
        subcommand => subcommand.name() !== 'help'
      )
    )
  }

  /**
   * Get an array containing visible command options.
   *
   * If visible, the `--help` and `--version` flags will **always** be the last
   * two options.
   *
   * @public
   * @override
   *
   * @param {Command} cmd - Command instance
   * @return {Option[]} Visible command options array
   */
  public override visibleOptions(cmd: Command): Option[] {
    return flat(
      fork(
        super.visibleOptions(cmd),
        option => !includes(['help', 'version'], option.name())
      )
    )
  }
}

export default HelpService
