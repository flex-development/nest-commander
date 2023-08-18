/**
 * @file Type Tests - ErrorFn
 * @module nest-commander/types/tests/unit-d/ErrorFn
 */

import type TestSubject from '../fn-error'

describe('unit-d:types/ErrorFn', () => {
  it('should be callable with [T]', () => {
    expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Error]>()
  })

  it('should return void', () => {
    expectTypeOf<TestSubject>().returns.toBeVoid()
  })
})
