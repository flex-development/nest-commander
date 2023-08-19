/**
 * @file Utilities - metakey
 * @module nest-commander/utils/metakey
 */

import type { MetadataName } from '#src/enums'
import * as pathe from '@flex-development/pathe'
import { capitalize } from '@flex-development/tutils'

/**
 * Metadata key type.
 *
 * @internal
 */
type Metakey<T extends MetadataName = MetadataName> =
  `CommandRunner${pathe.Delimiter}${Capitalize<T>}Metadata`

/**
 * Creates a metadata key.
 *
 * @internal
 *
 * @template T - Metadata name
 *
 * @param {T} name - Metadata name
 * @return {Metakey<T>} Metadata key for `name`
 */
const metakey = <T extends MetadataName>(name: T): Metakey<T> => {
  return `CommandRunner${pathe.delimiter}${capitalize(name)}Metadata`
}

export { metakey as default, type Metakey }
