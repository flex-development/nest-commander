/**
 * @file Type Tests - ArgumentFallback
 * @module nest-commander/types/tests/unit-d/ArgumentFallback
 */

import type { JsonPrimitive, Optional } from '@flex-development/tutils'
import type TestSubject from '../fallback-argument'

describe('unit-d:types/ArgumentFallback', () => {
  it('should match [description?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('description')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [value?: JsonPrimitive]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('value')
      .toEqualTypeOf<Optional<JsonPrimitive>>()
  })
})
