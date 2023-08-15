/**
 * @file Type Definitions - DiscoveredOption
 * @module nest-commander/types/DiscoveredOption
 */

import type { OptionMetadata } from '#src/metadata'
import type { DiscoveredMethodWithMeta } from '@golevelup/nestjs-discovery'

/**
 * Object representing a command option provided by a command provider.
 *
 * @see {@linkcode DiscoveredMethodWithMeta}
 * @see {@linkcode OptionMetadata}
 * @see https://github.com/golevelup/nestjs/tree/master/packages/discovery
 */
type DiscoveredOption = DiscoveredMethodWithMeta<OptionMetadata>

export type { DiscoveredOption as default }
