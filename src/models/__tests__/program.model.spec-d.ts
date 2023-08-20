/**
 * @file Type Tests - Program
 * @module nest-commander/models/tests/unit-d/Program
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type ProgramOptions from '../options-program.model'
import type TestSubject from '../program.model'

describe('unit-d:models/Program', () => {
  it('should match [readonly config: Readonly<Required<ProgramOptions>>]', () => {
    // Arrange
    type Expect = Readonly<Required<ProgramOptions>>

    // Expect
    expectTypeOf<TestSubject>().toHaveProperty('config').toEqualTypeOf<Expect>()
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'config'>().toBeString()
  })

  it('should match [readonly parent: null]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('parent').toEqualTypeOf<null>()
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'parent'>().toBeString()
  })
})
