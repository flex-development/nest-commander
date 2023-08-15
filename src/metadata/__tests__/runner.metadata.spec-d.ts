/**
 * @file Type Tests - RunnerMetadata
 * @module nest-commander/metadata/tests/unit-d/RunnerMetadata
 */

import type { CommandRunner } from '#src/abstracts'
import type { DiscoveredOption } from '#src/types'
import type CommandMetadata from '../command.metadata'
import type TestSubject from '../runner.metadata'

describe('unit-d:metadata/RunnerMetadata', () => {
  it('should match [command: CommandMetadata]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('command')
      .toEqualTypeOf<CommandMetadata>()
  })

  it('should match [instance: CommandRunner]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('instance')
      .toEqualTypeOf<CommandRunner>()
  })

  it('should match [options: DiscoveredOption[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('options')
      .toEqualTypeOf<DiscoveredOption[]>()
  })
})
