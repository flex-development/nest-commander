/**
 * @file Type Definitions - ErrorFn
 * @module nest-commander/types/ErrorFn
 */

/**
 * Handles an error thrown by a command.
 *
 * @template T - Error type
 *
 * @param {T} error - Error thrown
 * @return {void} Nothing when complete
 */
type ErrorFn = <T extends Error>(error: T) => void

export type { ErrorFn as default }
