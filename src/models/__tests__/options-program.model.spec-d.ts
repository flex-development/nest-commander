/**
 * @file Type Tests - ProgramOptions
 * @module nest-commander/models/tests/unit-d/ProgramOptions
 */

import type { VersionOptions } from '#src/interfaces'
import type { DoneFn, ErrorFn, ExitFn } from '#src/types'
import type { Optional } from '@flex-development/tutils'
import type TestSubject from '../options-program.model'

describe('unit-d:models/ProgramOptions', () => {
  it('should match [done?: DoneFn]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('done')
      .toMatchTypeOf<Optional<DoneFn>>()
  })

  it('should match [error?: ErrorFn', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('error')
      .toMatchTypeOf<Optional<ErrorFn>>()
  })

  it('should match [exit?: ExitFn]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('exit')
      .toEqualTypeOf<Optional<ExitFn>>()
  })

  it('should match [passthrough?: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('passthrough')
      .toEqualTypeOf<Optional<boolean>>()
  })

  it('should match [positional?: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('positional')
      .toEqualTypeOf<Optional<boolean>>()
  })

  it('should match [version?: VersionOptions | VersionOptions["version"]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('version')
      .toEqualTypeOf<Optional<VersionOptions | VersionOptions['version']>>()
  })
})
