/**
 * @file Functional Tests - Option
 * @module nest-commander/decorators/tests/functional/Option
 */

import { CommandRunner } from '#src/abstracts'
import { MetadataKey } from '#src/enums'
import type { OptionMetadata } from '#src/metadata'
import type { Class, Fn, PropertyDescriptor } from '@flex-development/tutils'
import TestSubject from '../option.decorator'

describe('functional:decorators/Option', () => {
  let target: Class<CommandRunner>
  let value: Fn<[string], number>

  beforeAll(() => {
    target = class ChangelogCommand extends CommandRunner {
      public run = vi.fn()
    }

    value = vi.fn().mockName('parseReleaseCount')
  })

  it('should add metadata entry for command option', () => {
    // Arrange
    const descriptor: PropertyDescriptor<typeof value> = { value }
    const metadata: OptionMetadata = { flags: '-r, --release-count <count>' }

    // Act
    TestSubject(metadata)(target, 'parseReleaseCount', descriptor)

    // Expect
    expect(Reflect.getMetadata(MetadataKey.OPTION, value)).to.eql(metadata)
  })
})
