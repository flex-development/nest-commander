/**
 * @file Interfaces - ArgumentOptions
 * @module nest-commander/interfaces/ArgumentOptions
 */

import type * as commander from '#src/commander'
import type { ArgumentFallback } from '#src/types'

/**
 * Command argument options.
 */
interface ArgumentOptions {
  /**
   * Array containing valid argument values.
   */
  choices?: string[]

  /**
   * Description to display in command help text.
   *
   * @default ''
   */
  description?: commander.Argument['description']

  /**
   * Default value configuration.
   *
   * @see {@linkcode ArgumentFallback}
   *
   * @default {}
   */
  fallback?: ArgumentFallback

  /**
   * Argument syntax.
   */
  syntax: string
}

export type { ArgumentOptions as default }
