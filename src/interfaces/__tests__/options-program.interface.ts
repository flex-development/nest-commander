/**
 * @file Type Tests - ProgramOptions
 * @module nest-commander/interfaces/tests/unit-d/ProgramOptions
 */

import type { Fn, Optional } from '@flex-development/tutils'
import type { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface'
import type * as commander from 'commander'
import type TestSubject from '../options-program.interface'
import type VersionOptions from '../options-version.interface'

describe('unit-d:interfaces/ProgramOptions', () => {
  it('should extend NestApplicationContextOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<NestApplicationContextOptions>()
  })

  it('should match [exit?(error: commander.CommanderError): void]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('exit')
      .toEqualTypeOf<Optional<(error: commander.CommanderError) => void>>()
  })

  it('should match [onrejected?(error: Error): void]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('onrejected')
      .toMatchTypeOf<Optional<Fn<[error: Error], void>>>()
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

  it('should match [version?: VersionOptions]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('version')
      .toEqualTypeOf<Optional<VersionOptions>>()
  })
})
