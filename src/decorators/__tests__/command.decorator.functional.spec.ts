/**
 * @file Functional Tests - Command
 * @module nest-commander/decorators/tests/functional/Command
 */

import { CommandRunner } from '#src/abstracts'
import { MetadataKey } from '#src/enums'
import type { CommandMetadata } from '#src/metadata'
import type { Class } from '@flex-development/tutils'
import TestSubject from '../command.decorator'

describe('functional:decorators/Command', () => {
  let target: Class<CommandRunner>

  beforeAll(() => {
    target = class ChangelogCommand extends CommandRunner {
      public run = vi.fn()
    }
  })

  it('should add metadata entry for command', () => {
    // Arrange
    const metadata: CommandMetadata = { name: 'changelog', root: true }

    // Act
    TestSubject(metadata)(target)

    // Expect
    expect(Reflect.getMetadata(MetadataKey.COMMAND, target)).to.eql(metadata)
  })
})
