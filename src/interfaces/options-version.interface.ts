/**
 * @file Interfaces - VersionOptions
 * @module nest-commander/interfaces/VersionOptions
 */

/**
 * Program version options.
 */
interface VersionOptions {
  /**
   * Version option description to display in help text.
   *
   * @default 'print version number'
   */
  description?: string

  /**
   * Version option flags.
   *
   * @default '-v, --version'
   */
  flags?: string

  /**
   * Program version.
   */
  version?: string
}

export type { VersionOptions as default }
