/**
 * @file Metadata - CommandMetadata
 * @module nest-commander/metadata/CommandMetadata
 */

import type { ArgumentOptions } from '#src/interfaces'

/**s
 * Command metadata.
 *
 * @todo subcommands
 */
interface CommandMetadata {
  /**
   * Arguments configuration.
   *
   * @see {@linkcode ArgumentOptions}
   */
  arguments?: ArgumentOptions['syntax'] | ArgumentOptions[]

  /**
   * Description to display in help text.
   *
   * @default ''
   */
  description?: string

  /**
   * Remove command from help text.
   *
   * @default false
   */
  hidden?: boolean

  /**
   * Command name.
   */
  name: string

  /**
   * Use command as the default command.
   *
   * @default false
   */
  root?: boolean
}

export type { CommandMetadata as default }
