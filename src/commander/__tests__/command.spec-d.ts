/**
 * @file Type Tests - Command
 * @module nest-commander/commander/tests/unit-d/Command
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type { Command as CommandBase } from 'commander'
import type TestSubject from '../command'
import type Example from '../example'

describe('unit-d:commander/Command', () => {
  it('should extend CommandBase', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<CommandBase>()
  })

  it('should match [readonly commands: Command[]]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'commands'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('commands')
      .toEqualTypeOf<TestSubject[]>()
  })

  it('should match [readonly examples: Example[]]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'examples'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('examples')
      .toEqualTypeOf<Example[]>()
  })
})
