/**
 * @file Interfaces - ArgumentOptions
 * @module nest-commander/interfaces/ArgumentOptions
 */

import type { ArgumentFallback } from '#src/types'
import type * as commander from 'commander'

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
   * Parses an argument `value`.
   *
   * @template T - Parsed argument value type
   *
   * @param {string} value - Value to parse
   * @param {T?} [previous] - Previous argument value
   * @return {T} Parsed argument value
   */
  parser?<T = string>(value: string, previous?: T): T

  /**
   * Argument syntax.
   */
  syntax: string
}

export type { ArgumentOptions as default }
