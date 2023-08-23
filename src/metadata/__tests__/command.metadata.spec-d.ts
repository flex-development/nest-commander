/**
 * @file Type Tests - CommandMetadata
 * @module nest-commander/metadata/tests/unit-d/CommandMetadata
 */

import type { CommandRunner } from '#src/abstracts'
import type { Example } from '#src/commander'
import type { ArgumentOptions } from '#src/interfaces'
import type { Class, OneOrMany, Optional } from '@flex-development/tutils'
import type TestSubject from '../command.metadata'

describe('unit-d:metadata/CommandMetadata', () => {
  it('should match [aliases?: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('aliases')
      .toEqualTypeOf<Optional<string[]>>()
  })

  it('should match [arguments?: ArgumentOptions["syntax"] | OneOrMany<ArgumentOptions>]', () => {
    // Arrange
    type Options = ArgumentOptions['syntax'] | OneOrMany<ArgumentOptions>

    // Expect
    expectTypeOf<TestSubject>()
      .toHaveProperty('arguments')
      .toEqualTypeOf<Optional<Options>>()
  })

  it('should match [description?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('description')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [examples?: (Example["text"] | Partial<Example>)[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('examples')
      .toEqualTypeOf<Optional<(Example['text'] | Partial<Example>)[]>>()
  })

  it('should match [hidden?: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('hidden')
      .toEqualTypeOf<Optional<boolean>>()
  })

  it('should match [name: string', () => {
    expectTypeOf<TestSubject>().toHaveProperty('name').toEqualTypeOf<string>()
  })

  it('should match [root?: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('root')
      .toEqualTypeOf<Optional<boolean>>()
  })

  it('should match [subcommands?: Class<CommandRunner>[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('subcommands')
      .toEqualTypeOf<Optional<Class<CommandRunner>[]>>()
  })
})
