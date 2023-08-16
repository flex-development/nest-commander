/**
 * @file Type Definitions - ArgumentFallback
 * @module nest-commander/types/ArgumentFallback
 */

import type { JsonPrimitive } from '@flex-development/tutils'

/**
 * Default argument value configuration.
 */
type ArgumentFallback = {
  /**
   * Description of default value to display in help text.
   */
  description?: string

  /**
   * Default value.
   *
   * @see {@linkcode JsonPrimitive}
   */
  value?: JsonPrimitive
}

export type { ArgumentFallback as default }
