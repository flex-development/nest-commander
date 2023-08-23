/**
 * @file Type Tests - DoneFn
 * @module nest-commander/types/tests/unit-d/DoneFn
 */

import type * as commander from '#src/commander'
import type TestSubject from '../fn-done'

describe('unit-d:types/DoneFn', () => {
  it('should be callable with [string[], T, commander.Command]', () => {
    // Arrange
    type T = { id: string }
    type Expect = [string[], T, commander.Command]

    // Expect
    expectTypeOf<TestSubject<T>>().parameters.toEqualTypeOf<Expect>()
  })

  it('should return Promise<void> | void', () => {
    expectTypeOf<TestSubject>().returns.toEqualTypeOf<Promise<void> | void>()
  })
})
