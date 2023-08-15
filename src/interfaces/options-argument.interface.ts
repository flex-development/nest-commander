/**
 * @file Interfaces - ArgumentOptions
 * @module nest-commander/interfaces/ArgumentOptions
 */

import type { Primitive } from '@flex-development/tutils'
import type * as commander from 'commander'

/**
 * Command argument options.
 *
 * @see {@linkcode commander.Command.argument}
 */
interface ArgumentOptions {
  /**
   * Description to be displayed in command help text.
   *
   * @default ''
   */
  description?: commander.Argument['description']

  /**
   * Default value.
   */
  fallback?: Primitive

  /**
   * Argument syntax.
   */
  syntax: string
}

export type { ArgumentOptions as default }
