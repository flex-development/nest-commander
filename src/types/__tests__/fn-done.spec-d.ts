/**
 * @file Type Tests - DoneFn
 * @module nest-commander/types/tests/unit-d/DoneFn
 */

import type * as commander from 'commander'
import type TestSubject from '../fn-done'

describe('unit-d:types/DoneFn', () => {
  it('should be callable with [string[], T]', () => {
    // Arrange
    type Expect = [argv: string[], opts: commander.OptionValues]

    // Expect
    expectTypeOf<TestSubject>().parameters.toEqualTypeOf<Expect>()
  })

  it('should return Promise<void> | void', () => {
    expectTypeOf<TestSubject>().returns.toEqualTypeOf<Promise<void> | void>()
  })
})
