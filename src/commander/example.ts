/**
 * @file commander - Example
 * @module nest-commander/commander/Example
 */

import { ifelse, trim, trimStart } from '@flex-development/tutils'

/**
 * Command example model.
 *
 * @class
 */
class Example {
  /**
   * Example {@linkcode text} prefix.
   *
   * @example
   *  'cross-env FORCE_COLOR=3'
   *
   * @default ''
   *
   * @public
   * @instance
   * @member {string} prefix
   */
  public prefix: string

  /**
   * Example text.
   *
   * @public
   * @instance
   * @member {string} text
   */
  public text: string

  /**
   * Creates a new command example.
   *
   * @param {string} text - Example text
   * @param {string?} [prefix=''] - Example text prefix
   */
  constructor(text: string, prefix: string = '') {
    this.prefix = trim(prefix)
    this.text = trimStart(text)
  }

  /**
   * Get a string representation of `this` example.
   *
   * @public
   *
   * @return {string} String representation of `this` example
   */
  public toString(): string {
    return ifelse(this.prefix, `${this.prefix} ${this.text}`, this.text)
  }
}

export default Example
