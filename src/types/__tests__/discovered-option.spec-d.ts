/**
 * @file Type Tests - DiscoveredOption
 * @module nest-commander/types/tests/unit-d/DiscoveredOption
 */

import type { OptionMetadata } from '#src/metadata'
import type { DiscoveredMethodWithMeta } from '@golevelup/nestjs-discovery'
import type TestSubject from '../discovered-option'

describe('unit-d:types/DiscoveredOption', () => {
  it('should equal DiscoveredMethodWithMeta<OptionMetadata>', () => {
    // Arrange
    type Expect = DiscoveredMethodWithMeta<OptionMetadata>

    // Expect
    expectTypeOf<TestSubject>().toEqualTypeOf<Expect>()
  })
})
