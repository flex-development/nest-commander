/**
 * @file Examples - AlphabetizeCommand
 * @module examples/string-utils/AlphabetizeCommand
 */

import {
  CliUtilityService,
  Command,
  CommandRunner,
  Option
} from '@flex-development/nest-commander'
import type * as commander from '@flex-development/nest-commander/commander'
import {
  SortOrder,
  alphabetize,
  cast,
  identity,
  join,
  type AlphabetizeOptions,
  type Omit,
  type Shake
} from '@flex-development/tutils'

/**
 * Unsupported {@linkcode alphabetize} options.
 */
type Unsupported = 'localeMatcher' | 'locales'

/**
 * Parsed command options.
 *
 * @extends {Shake<Required<Omit<AlphabetizeOptions,Unsupported>>>}
 */
interface Opts extends Shake<Required<Omit<AlphabetizeOptions, Unsupported>>> {}

/**
 * Alphabetize command model.
 *
 * @class
 * @extends {CommandRunner}
 */
@Command({
  aliases: ['alpha'],
  arguments: '[strings...]',
  description: 'sort a list alphabetically',
  name: 'alphabetize'
})
class AlphabetizeCommand extends CommandRunner {
  /**
   * Creates a new `alphabetize` command runner.
   *
   * @param {CliUtilityService} util - Utilities service instance
   */
  constructor(protected readonly util: CliUtilityService) {
    super()
  }

  /**
   * Parses the `--case-first` flag.
   *
   * @see {@linkcode Opts.caseFirst}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {Required<Opts>['caseFirst']} Parsed option value
   */
  @Option({
    choices: ['false', 'lower', 'upper'],
    description:
      'indicate if uppercase or lowercase strings should be sorted first',
    fallback: { value: 'upper' },
    flags: '-c, --case-first <choice>'
  })
  protected parseCaseFirst(val: string): Required<Opts>['caseFirst'] {
    return cast(val)
  }

  /**
   * Parses the `--ignore-punctuation` flag.
   *
   * @see {@linkcode Opts.ignorePunctuation}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {Required<Opts>['ignorePunctuation']} Parsed option value
   */
  @Option({
    description: 'ignore punctuation',
    fallback: { value: false },
    flags: '-i, --ignore-punctuation',
    preset: 'true'
  })
  protected parseIgnorePunctuation(
    val: string
  ): Required<Opts>['ignorePunctuation'] {
    return this.util.parseBoolean(val)
  }

  /**
   * Parses the `--numeric` flag.
   *
   * @see {@linkcode Opts.numeric}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {Required<Opts>['sensitivity']} Parsed option value
   */
  @Option({
    description: 'use numeric collation',
    fallback: { value: true },
    flags: '-n, --numeric',
    preset: 'true'
  })
  protected parseNumeric(val: string): Required<Opts>['numeric'] {
    return this.util.parseBoolean(val)
  }

  /**
   * Parses the `--order` flag.
   *
   * @see {@linkcode Opts.order}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {Required<Opts>['order']} Parsed option value
   */
  @Option({
    choices: [SortOrder.ASC.toString(), SortOrder.DESC.toString()],
    description: 'sort order rule',
    fallback: { value: SortOrder.ASC },
    flags: '-o, --order <order>'
  })
  protected parseOrder(val: string): Required<Opts>['order'] {
    return cast(this.util.parseInt(val))
  }

  /**
   * Parses the `--sensitivity` flag.
   *
   * @see {@linkcode Opts.sensitivity}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {Required<Opts>['sensitivity']} Parsed option value
   */
  @Option({
    choices: ['accent', 'base', 'case', 'variant'],
    description: 'difference in strings that should lead to non-zero result',
    fallback: { value: 'variant' },
    flags: '-s, --sensitivity <sensitivity>'
  })
  protected parseSensitivity(val: string): Required<Opts>['sensitivity'] {
    return cast(val)
  }

  /**
   * Command action handler.
   *
   * @public
   *
   * @param {string[]} args - Parsed command arguments
   * @param {Opts} opts - Parsed command options
   * @return {void} Nothing when complete
   */
  public run(args: string[], opts: Opts): void {
    return void console.log(join(alphabetize(args, identity, opts), ' '))
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

export default AlphabetizeCommand
