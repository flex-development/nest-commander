/**
 * @file Unit Tests - MetadataKey
 * @module nest-commander/enums/tests/unit/MetadataKey
 */

import { metakey } from '#src/utils'
import { uppercase, values } from '@flex-development/tutils'
import TestSubject from '../metadata-key'
import MetadataName from '../metadata-name'

describe('unit:enums/MetadataKey', () => {
  it('should be Metakey object', () => {
    values(MetadataName).forEach(name => {
      expect(TestSubject).to.have.property(uppercase(name), metakey(name))
    })
  })

  it('should be frozen', () => {
    expect(TestSubject).to.be.frozen
  })
})
