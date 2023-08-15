/**
 * @file Type Tests - DiscoveredCommand
 * @module nest-commander/types/tests/unit-d/DiscoveredCommand
 */

import type { CommandMetadata } from '#src/metadata'
import type { DiscoveredClassWithMeta } from '@golevelup/nestjs-discovery'
import type TestSubject from '../discovered-command'

describe('unit-d:types/DiscoveredCommand', () => {
  it('should equal DiscoveredClassWithMeta<CommandMetadata>', () => {
    // Arrange
    type Expect = DiscoveredClassWithMeta<CommandMetadata>

    // Expect
    expectTypeOf<TestSubject>().toEqualTypeOf<Expect>()
  })
})
