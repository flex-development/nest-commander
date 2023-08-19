/**
 * @file Decorators - Option
 * @module nest-commander/decorators/Option
 */

import { MetadataKey } from '#src/enums'
import type { OptionMetadata } from '#src/metadata'
import type {
  DecoratorTarget,
  Fn,
  OwnPropertyKey,
  PropertyDescriptor
} from '@flex-development/tutils'

/**
 * Command option decorator function.
 *
 * @internal
 *
 * @template T - Property descriptor value type
 * @template U - Class constructor or instance type
 *
 * @param {U} target - Class declaration or instance
 * @param {OwnPropertyKey} key - Class method name
 * @param {PropertyDescriptor<T>} descriptor - Property descriptor for `key`
 * @return {PropertyDescriptor<T>} Property descriptor for `key`
 */
type OptionDecorator = <T extends Fn, U extends DecoratorTarget>(
  target: U,
  key: OwnPropertyKey,
  descriptor: PropertyDescriptor<T>
) => PropertyDescriptor<T>

/**
 * Specify a command option.
 *
 * @see {@linkcode OptionMetadata}
 *
 * @decorator
 *
 * @param {OptionMetadata} metadata - Command option metadata
 * @return {OptionDecorator} Class method decorator function
 */
const Option = (metadata: OptionMetadata): OptionDecorator => {
  return <T extends Fn, U extends DecoratorTarget>(
    target: U,
    key: OwnPropertyKey,
    descriptor: PropertyDescriptor<T>
  ): PropertyDescriptor<T> => {
    Reflect.defineMetadata(MetadataKey.OPTION, metadata, descriptor.value!)
    return descriptor
  }
}

export { Option as default, type OptionDecorator }
