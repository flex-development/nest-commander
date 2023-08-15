/**
 * @file Metadata - RunnerMetadata
 * @module nest-commander/metadata/RunnerMetadata
 */

import type { CommandRunner } from '#src/abstracts'
import type { DiscoveredOption } from '#src/types'
import type CommandMetadata from './command.metadata'

/**
 * Command runner metadata.
 */
interface RunnerMetadata {
  /**
   * Command metadata.
   *
   * @see {@linkcode CommandMetadata}
   */
  command: CommandMetadata

  /**
   * Command runner instance.
   *
   * @see {@linkcode CommandRunner}
   */
  instance: CommandRunner

  /**
   * Discovered command options.
   *
   * @see {@linkcode DiscoveredOption}
   */
  options: DiscoveredOption[]
}

export type { RunnerMetadata as default }
