/**
 * @file Type Tests - OptionFallback
 * @module nest-commander/types/tests/unit-d/OptionFallback
 */

import type { JsonValue, Optional } from '@flex-development/tutils'
import type TestSubject from '../option-fallback'

describe('unit-d:types/OptionFallback', () => {
  it('should match [description?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('description')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [value?: JsonValue]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('value')
      .toEqualTypeOf<Optional<JsonValue>>()
  })
})
