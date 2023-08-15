/**
 * @file Type Tests - MetadataKey
 * @module nest-commander/enums/tests/unit-d/MetadataKey
 */

import type { Metakey } from '#src/utils/metakey'
import type TestSubject from '../metadata-key'
import type MetadataName from '../metadata-name'

describe('unit-d:enums/MetadataKey', () => {
  it('should match [COMMAND = Metakey<MetadataName.COMMAND>]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('COMMAND')
      .toEqualTypeOf<Metakey<MetadataName.COMMAND>>()
  })

  it('should match [OPTION = Metakey<MetadataName.OPTION>]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('OPTION')
      .toEqualTypeOf<Metakey<MetadataName.OPTION>>()
  })

  it('should match [RUNNER = Metakey<MetadataName.RUNNER>]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('RUNNER')
      .toEqualTypeOf<Metakey<MetadataName.RUNNER>>()
  })
})
