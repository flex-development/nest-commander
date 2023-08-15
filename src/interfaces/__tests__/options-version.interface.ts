/**
 * @file Type Tests - VersionOptions
 * @module nest-commander/interfaces/tests/unit-d/VersionOptions
 */

import type { Optional } from '@flex-development/tutils'
import type TestSubject from '../options-version.interface'

describe('unit-d:interfaces/VersionOptions', () => {
  it('should match [description?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('description')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [flags?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('flags')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [version?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('version')
      .toEqualTypeOf<Optional<string>>()
  })
})
