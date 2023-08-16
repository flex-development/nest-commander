/**
 * @file Type Tests - ArgumentOptions
 * @module nest-commander/interfaces/tests/unit-d/ArgumentOptions
 */

import type { ArgumentFallback } from '#src/types'
import type { Fn, Optional, Times } from '@flex-development/tutils'
import type * as commander from 'commander'
import type TestSubject from '../options-argument.interface'

describe('unit-d:interfaces/ArgumentOptions', () => {
  it('should match [choices?: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('choices')
      .toEqualTypeOf<Optional<string[]>>()
  })

  it('should match [description?: commander.Argument["description"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('description')
      .toEqualTypeOf<Optional<commander.Argument['description']>>()
  })

  it('should match [fallback?: ArgumentFallback]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('fallback')
      .toEqualTypeOf<Optional<ArgumentFallback>>()
  })

  it('should match [parser?<T>(value: string, previous?: T): T]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('parser')
      .toMatchTypeOf<Optional<Fn<Times<2, string>, string>>>()
  })

  it('should match [syntax: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('syntax').toEqualTypeOf<string>()
  })
})
