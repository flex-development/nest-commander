/**
 * @file Decorators - Command
 * @module nest-commander/decorators/Command
 */

import type { CommandRunner } from '#src/abstracts'
import { MetadataKey } from '#src/enums'
import type { CommandMetadata } from '#src/metadata'
import type { Class } from '@flex-development/tutils'

/**
 * Command decorator function.
 *
 * @internal
 *
 * @template T - Class type
 *
 * @param {T} target - Class declaration
 * @return {T} Class declaration
 */
type CommandDecorator = <T extends Class<CommandRunner>>(target: T) => T

/**
 * Specify a command.
 *
 * @see {@linkcode CommandMetadata}
 *
 * @decorator
 *
 * @param {CommandMetadata} metadata - Command metadata
 * @return {CommandDecorator} Class decorator function
 */
const Command = (metadata: CommandMetadata): CommandDecorator => {
  return <T extends Class<CommandRunner>>(target: T): T => {
    Reflect.defineMetadata(MetadataKey.COMMAND, metadata, target)
    return target
  }
}

export { Command as default, type CommandDecorator }
