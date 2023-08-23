/**
 * @file Type Tests - Example
 * @module nest-commander/commander/tests/unit-d/Example
 */

import type TestSubject from '../example'

describe('unit-d:commander/Example', () => {
  it('should match [prefix: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('prefix').toEqualTypeOf<string>()
  })

  it('should match [text: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('text').toEqualTypeOf<string>()
  })
})
