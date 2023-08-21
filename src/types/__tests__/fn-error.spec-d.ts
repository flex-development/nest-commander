/**
 * @file Type Tests - ErrorFn
 * @module nest-commander/types/tests/unit-d/ErrorFn
 */

import type * as esbuild from 'esbuild'
import type TestSubject from '../fn-error'

describe('unit-d:types/ErrorFn', () => {
  it('should be callable with [T]', () => {
    // Arrange
    type T = esbuild.BuildFailure

    // Expect
    expectTypeOf<TestSubject<T>>().parameters.toEqualTypeOf<[T]>()
  })

  it('should return void', () => {
    expectTypeOf<TestSubject>().returns.toBeVoid()
  })
})
