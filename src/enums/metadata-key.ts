/**
 * @file Enums - MetadataKey
 * @module nest-commander/enums/MetadataKey
 */

import metakey, { type Metakey } from '#src/utils/metakey'
import MetadataName from './metadata-name'

/**
 * Metadata keys.
 *
 * @enum {Metakey}
 */
const MetadataKey = Object.freeze({
  COMMAND: metakey(MetadataName.COMMAND),
  OPTION: metakey(MetadataName.OPTION),
  RUNNER: metakey(MetadataName.RUNNER),
  SUBCOMMAND: metakey(MetadataName.SUBCOMMAND)
})

export default MetadataKey
