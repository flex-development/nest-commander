/**
 * @file Functional Tests - Subcommand
 * @module nest-commander/decorators/tests/functional/Subcommand
 */

import { CommandRunner } from '#src/abstracts'
import { MetadataKey } from '#src/enums'
import type { CommandMetadata } from '#src/metadata'
import type { Class } from '@flex-development/tutils'
import TestSubject from '../subcommand.decorator'

describe('functional:decorators/Subcommand', () => {
  let target: Class<CommandRunner>

  beforeAll(() => {
    target = class TimezoneCommand extends CommandRunner {
      public run = vi.fn()
    }
  })

  it('should add metadata entry for subcommand', () => {
    // Arrange
    const metadata: CommandMetadata = { name: 'timezone' }

    // Act
    TestSubject(metadata)(target)

    // Expect
    expect(Reflect.getMetadata(MetadataKey.SUBCOMMAND, target)).to.eql(metadata)
  })
})
