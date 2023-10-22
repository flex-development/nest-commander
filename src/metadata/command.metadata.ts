/**
 * @file Metadata - CommandMetadata
 * @module nest-commander/metadata/CommandMetadata
 */

import type { CommandRunner } from '#src/abstracts'
import type { Example } from '#src/commander'
import type { ArgumentOptions } from '#src/interfaces'
import type { Class, OneOrMany } from '@flex-development/tutils'

/**
 * Command metadata.
 */
interface CommandMetadata {
  /**
   * Command aliases.
   *
   * @default []
   */
  aliases?: string[]

  /**
   * Arguments configuration.
   *
   * @see {@linkcode ArgumentOptions}
   */
  arguments?: ArgumentOptions['syntax'] | OneOrMany<ArgumentOptions>

  /**
   * Description to display in help text.
   *
   * @default ''
   */
  description?: string

  /**
   * Command examples.
   *
   * @see {@linkcode Example}
   *
   * @default []
   */
  examples?: (Example['text'] | Partial<Example>)[]

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

  /**
   * Subcommand providers.
   */
  subcommands?: Class<CommandRunner>[]
}

export type { CommandMetadata as default }
