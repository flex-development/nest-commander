/**
 * @file Type Tests - ExitFn
 * @module nest-commander/types/tests/unit-d/ExitFn
 */

import type * as commander from '#src/commander'
import type TestSubject from '../fn-exit'

describe('unit-d:types/ExitFn', () => {
  it('should be callable with [commander.CommanderError]', () => {
    // Arrange
    type Expect = [error: commander.CommanderError]

    // Expect
    expectTypeOf<TestSubject>().parameters.toEqualTypeOf<Expect>()
  })

  it('should return void', () => {
    expectTypeOf<TestSubject>().returns.toBeVoid()
  })
})
