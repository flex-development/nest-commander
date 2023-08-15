/**
 * @file Metadata - OptionMetadata
 * @module nest-commander/metadata/OptionMetadata
 */

import type { OptionFallback } from '#src/types'
import type { EmptyArray, Fn, OneOrMany } from '@flex-development/tutils'
import type * as commander from 'commander'

/**
 * Command option metadata.
 *
 * @see https://github.com/tj/commander.js#options
 */
interface OptionMetadata {
  /**
   * Array containing option values, or a function that generates such an array.
   */
  choices?: Fn<EmptyArray, string[]> | string[]

  /**
   * Names of options that conflict with this option.
   *
   * An error will be displayed if conflicting options are found during parsing.
   *
   * @default []
   */
  conflicts?: OneOrMany<string>

  /**
   * Description to display in help text.
   *
   * @default ''
   */
  description?: string

  /**
   * Name of environment variable to check for option value.
   */
  env?: string

  /**
   * Default value configuration.
   *
   * @see {@linkcode OptionFallback}
   *
   * @default {}
   */
  fallback?: OptionFallback

  /**
   * Option flags.
   */
  flags: string

  /**
   * Remove option from help text.
   *
   * @default false
   */
  hidden?: boolean

  /**
   * Implied option values.
   *
   * **Note**: Custom parsing is not applicable to implied values.
   *
   * @see {@linkcode commander.OptionValues}
   *
   * @default {}
   */
  implies?: commander.OptionValues

  /**
   * Require option to have a value after it is parsed.
   *
   * @default false
   */
  mandatory?: boolean

  /**
   * Preset to use when option is specified without an option-argument.
   */
  preset?: unknown
}

export type { OptionMetadata as default }
