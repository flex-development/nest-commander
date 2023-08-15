/**
 * @file Unit Tests - metakey
 * @module nest-commander/utils/tests/unit/metakey
 */

import { MetadataName } from '#src/enums'
import { delimiter } from '@flex-development/pathe'
import { capitalize } from '@flex-development/tutils'
import testSubject from '../metakey'

describe('unit:utils/metakey', () => {
  it('should return metadata key', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[] = [
      [MetadataName.COMMAND],
      [MetadataName.OPTION],
      [MetadataName.RUNNER]
    ]

    // Expect
    cases.forEach(([name]) => {
      const expected = `CommandRunner${delimiter}${capitalize(name)}Metadata`

      expect(testSubject(name)).to.equal(expected)
    })
  })
})
