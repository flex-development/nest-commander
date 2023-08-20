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
import type * as commander from 'commander'

/**
 * Unsupported {@linkcode alphabetize} options.
 */
type Unsupported = 'localeMatcher' | 'locales'

/**
 * Parsed command options.
 *
 * @extends {Shake<Required<Omit<AlphabetizeOptions,Unsupported>>>}
 */
interface Flags
  extends Shake<Required<Omit<AlphabetizeOptions, Unsupported>>> {}

/**
 * Alphabetize command model.
 *
 * @class
 * @extends {CommandRunner}
 */
@Command({
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
   * @see {@linkcode Flags.caseFirst}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {Required<Flags>['caseFirst']} Parsed option value
   */
  @Option({
    choices: ['false', 'lower', 'upper'],
    description:
      'indicate if uppercase or lowercase strings should be sorted first',
    fallback: { value: 'upper' },
    flags: '-c, --case-first <choice>'
  })
  protected parseCaseFirst(val: string): Required<Flags>['caseFirst'] {
    return cast(val)
  }

  /**
   * Parses the `--ignore-punctuation` flag.
   *
   * @see {@linkcode Flags.ignorePunctuation}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {Required<Flags>['ignorePunctuation']} Parsed option value
   */
  @Option({
    description: 'ignore punctuation',
    fallback: { value: false },
    flags: '-i, --ignore-punctuation',
    preset: 'true'
  })
  protected parseIgnorePunctuation(
    val: string
  ): Required<Flags>['ignorePunctuation'] {
    return this.util.parseBoolean(val)
  }

  /**
   * Parses the `--numeric` flag.
   *
   * @see {@linkcode Flags.numeric}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {Required<Flags>['sensitivity']} Parsed option value
   */
  @Option({
    description: 'use numeric collation',
    fallback: { value: true },
    flags: '-n, --numeric',
    preset: 'true'
  })
  protected parseNumeric(val: string): Required<Flags>['numeric'] {
    return this.util.parseBoolean(val)
  }

  /**
   * Parses the `--order` flag.
   *
   * @see {@linkcode Flags.order}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {Required<Flags>['order']} Parsed option value
   */
  @Option({
    choices: [SortOrder.ASC.toString(), SortOrder.DESC.toString()],
    description: 'sort order rule',
    fallback: { value: SortOrder.ASC },
    flags: '-o, --order <order>'
  })
  protected parseOrder(val: string): Required<Flags>['order'] {
    return cast(this.util.parseInt(val))
  }

  /**
   * Parses the `--sensitivity` flag.
   *
   * @see {@linkcode Flags.sensitivity}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {Required<Flags>['sensitivity']} Parsed option value
   */
  @Option({
    choices: ['accent', 'base', 'case', 'variant'],
    description: 'difference in strings that should lead to non-zero result',
    fallback: { value: 'variant' },
    flags: '-s, --sensitivity <sensitivity>'
  })
  protected parseSensitivity(val: string): Required<Flags>['sensitivity'] {
    return cast(val)
  }

  /**
   * Command action handler.
   *
   * @public
   *
   * @param {string[]} args - Command arguments
   * @param {Flags} flags - Parsed command options
   * @return {void} Nothing when complete
   */
  public run(args: string[], flags: Flags): void {
    return void console.log(join(alphabetize(args, identity, flags), ' '))
  }

  /**
   * Sets the current command instance.
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

export default AlphabetizeCommand
