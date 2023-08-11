/**
 * @file Providers - CliUtilityService
 * @module nest-commander/providers/CliUtilityService
 */

import {
  cast,
  ifelse,
  includes,
  lowercase,
  objectify,
  select,
  split,
  trim,
  type EmptyObject,
  type Float,
  type Integer,
  type NumberString,
  type OneOrMany,
  type Primitive
} from '@flex-development/tutils'
import { Injectable } from '@nestjs/common'

/**
 * CLI utilities provider.
 *
 * @class
 */
@Injectable()
class CliUtilityService {
  /**
   * Converts a string to a boolean.
   *
   * @todo examples
   *
   * @public
   *
   * @param {string} val - String to convert
   * @return {boolean} Parsed boolean
   */
  public parseBoolean(val: string): boolean {
    return includes(['1', 'true', 'y'], lowercase(trim(val)))
  }

  /**
   * Converts a string to a floating point number.
   *
   * @todo examples
   *
   * @see {@linkcode Float}
   * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat
   *
   * @public
   *
   * @param {string} val - String to convert
   * @return {Float} Parsed float
   */
  public parseFloat(val: string): Float {
    return cast(Number.parseFloat(val))
  }

  /**
   * Converts a string to an integer.
   *
   * @todo examples
   *
   * @see {@linkcode Integer}
   * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt
   *
   * @public
   *
   * @param {string} val - String to convert
   * @param {number?} [radix=10] - Value between `2` and `36` that specifies the
   * base of the number in `val`
   * @return {Integer} Parsed integer
   */
  public parseInt(val: string, radix: number = 10): Integer {
    return cast(Number.parseInt(val, radix))
  }

  /**
   * Converts a list to a {@linkcode Set}.
   *
   * @todo examples
   *
   * @public
   *
   * @template T - List item type
   *
   * @param {string} val - List to convert
   * @return {Set<T>} Parsed list as {@linkcode Set}
   */
  public parseList<T extends string = string>(val: string): Set<T> {
    return new Set<T>(cast<T[]>(split(val, /(?<!.\\),/)))
  }

  /**
   * Converts a list of key/value pairs to a plain object.
   *
   * Pairs are expected to be separated with a colon (`:`). Values are expected
   * to be primitives or arrays containing primitives.
   *
   * @todo examples
   *
   * @public
   *
   * @template K - Property key type
   * @template V - Property value type
   *
   * @param {string} val - List to convert
   * @return {EmptyObject | Record<K, V>} Parsed plain object
   */
  public parseObject<
    K extends NumberString = NumberString,
    V extends OneOrMany<Primitive> = Primitive
  >(val: string): EmptyObject | { [H in K]: V } {
    // exit early if value does not contain key/value pairs
    if (!/(?<!.\\):/.test(val)) return {}

    /**
     * Parsed key value pairs.
     *
     * @const {[string, string][]} pairs
     */
    const pairs: [key: string, value: string][] = select(
      split(val, /,(?=[^,]+?:)/),
      null,
      (pair: string): [string, string] => cast(split(pair, /(?<=^[^:]+):/))
    )

    return objectify(
      pairs,
      ([key]): K => cast(trim(key)),
      ([, value]): V => {
        try {
          return cast(JSON.parse(value))
        } catch {
          return cast(ifelse(trim(value) === 'undefined', undefined, value))
        }
      }
    )
  }

  /**
   * Converts a string to a regular expression.
   *
   * @todo examples
   *
   * @see https://regex101.com/r/iN1GMS
   *
   * @public
   *
   * @param {string} val - String to evaluate
   * @return {RegExp} Parsed regular expression
   */
  public parseRegExp(val: string): RegExp {
    /**
     * Regular expression matching a regular expression.
     *
     * @const {RegExp} regex
     */
    const regex: RegExp =
      /(?<pattern>^[^/].+|(?:(?<=(?:^\/)).+(?=\/(?<flags>(?<=\/)\w+)?)))/

    // parse regex string
    const [, pattern = '', flags] = regex.exec(val) ?? []

    return new RegExp(pattern, flags)
  }
}

export default CliUtilityService
