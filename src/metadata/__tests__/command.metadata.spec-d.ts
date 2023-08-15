/**
 * @file Type Tests - CommandMetadata
 * @module nest-commander/metadata/tests/unit-d/CommandMetadata
 */

import type { ArgumentOptions } from '#src/interfaces'
import type { Optional } from '@flex-development/tutils'
import type TestSubject from '../command.metadata'

describe('unit-d:metadata/CommandMetadata', () => {
  it('should match [arguments?: ArgumentOptions["syntax"] | ArgumentOptions[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('arguments')
      .toEqualTypeOf<Optional<ArgumentOptions['syntax'] | ArgumentOptions[]>>()
  })

  it('should match [description?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('description')
      .toEqualTypeOf<Optional<string>>()
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
})
