/**
 * @file Mocks - dateformat
 * @module mocks/dateformat
 * @see https://github.com/felixge/node-dateformat
 */

/**
 * [`dateformat`][1] module type.
 *
 * [1]: https://github.com/felixge/node-dateformat
 */
type Actual = typeof import('dateformat')

/**
 * `dateformat` module.
 *
 * @const {Actual} actual
 */
const actual: Actual = await vi.importActual<Actual>('dateformat')

const dateformat = vi.fn(actual.default)
const formatTimezone = vi.fn(actual.formatTimezone)
const masks = actual.masks

export { dateformat as default, formatTimezone, masks }
