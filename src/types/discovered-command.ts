/**
 * @file Type Definitions - DiscoveredCommand
 * @module nest-commander/types/DiscoveredCommand
 */

import type { CommandMetadata } from '#src/metadata'
import type { DiscoveredClassWithMeta } from '@golevelup/nestjs-discovery'

/**
 * Object representing a discovered command provider.
 *
 * @see {@linkcode DiscoveredClassWithMeta}
 * @see {@linkcode CommandMetadata}
 * @see https://github.com/golevelup/nestjs/tree/master/packages/discovery
 */
type DiscoveredCommand = DiscoveredClassWithMeta<CommandMetadata>

export type { DiscoveredCommand as default }
