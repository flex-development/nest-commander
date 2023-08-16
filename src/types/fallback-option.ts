/**
 * @file Type Definitions - OptionFallback
 * @module nest-commander/types/OptionFallback
 */

import type { JsonValue } from '@flex-development/tutils'

/**
 * Default option value configuration.
 */
type OptionFallback = {
  /**
   * Description of default value to display in help text.
   */
  description?: string

  /**
   * Default value.
   *
   * @see {@linkcode JsonValue}
   */
  value?: JsonValue
}

export type { OptionFallback as default }
