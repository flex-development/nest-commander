/**
 * @file Type Tests - ArgumentOptions
 * @module nest-commander/interfaces/tests/unit-d/ArgumentOptions
 */

import type { Optional, Primitive } from '@flex-development/tutils'
import type * as commander from 'commander'
import type TestSubject from '../options-argument.interface'

describe('unit-d:interfaces/ArgumentOptions', () => {
  it('should match [description?: commander.Argument["description"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('description')
      .toEqualTypeOf<Optional<commander.Argument['description']>>()
  })

  it('should match [fallback?: Primitive]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('fallback')
      .toEqualTypeOf<Primitive>()
  })

  it('should match [syntax: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('syntax').toEqualTypeOf<string>()
  })
})
