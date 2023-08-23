/**
 * @file Type Tests - OptionMetadata
 * @module nest-commander/metadata/tests/unit-d/OptionMetadata
 */

import type * as commander from '#src/commander'
import type { OptionFallback } from '#src/types'
import type { OneOrMany, Optional } from '@flex-development/tutils'
import type TestSubject from '../option.metadata'

describe('unit-d:metadata/OptionMetadata', () => {
  it('should match [choices?: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('choices')
      .toEqualTypeOf<Optional<string[]>>()
  })

  it('should match [conflicts?: OneOrMany<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('conflicts')
      .toEqualTypeOf<Optional<OneOrMany<string>>>()
  })

  it('should match [description?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('description')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [env?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('env')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [fallback?: OptionFallback]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('fallback')
      .toEqualTypeOf<Optional<OptionFallback>>()
  })

  it('should match [flags: string', () => {
    expectTypeOf<TestSubject>().toHaveProperty('flags').toEqualTypeOf<string>()
  })

  it('should match [hidden?: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('hidden')
      .toEqualTypeOf<Optional<boolean>>()
  })

  it('should match [implies?: commander.OptionValues]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('implies')
      .toEqualTypeOf<Optional<commander.OptionValues>>()
  })

  it('should match [mandatory?: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('mandatory')
      .toEqualTypeOf<Optional<boolean>>()
  })

  it('should match [preset?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('preset')
      .toEqualTypeOf<Optional<string>>()
  })
})
