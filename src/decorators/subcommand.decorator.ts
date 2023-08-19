/**
 * @file Decorators - Subcommand
 * @module nest-commander/decorators/Subcommand
 */

import type { CommandRunner } from '#src/abstracts'
import { MetadataKey } from '#src/enums'
import type { CommandMetadata } from '#src/metadata'
import type { Constructor } from '@flex-development/tutils'
import type { CommandDecorator } from './command.decorator'

/**
 * Specify a subcommand.
 *
 * @see {@linkcode CommandMetadata}
 *
 * @decorator
 *
 * @param {CommandMetadata} metadata - Subcommand metadata
 * @return {CommandDecorator} Class decorator function
 */
const Subcommand = (metadata: CommandMetadata): CommandDecorator => {
  return <T extends Constructor<CommandRunner>>(target: T): T => {
    Reflect.defineMetadata(MetadataKey.SUBCOMMAND, metadata, target)
    return target
  }
}

export { Subcommand as default }
