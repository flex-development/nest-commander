/**
 * @file Entry Point - commander
 * @module nest-commander/commander
 */

export {
  Argument,
  CommanderError,
  Help,
  InvalidArgumentError,
  Option,
  type AddHelpTextContext,
  type AddHelpTextPosition,
  type CommandOptions,
  type ErrorOptions,
  type HelpContext,
  type HookEvent,
  type OptionValueSource,
  type OptionValues,
  type OutputConfiguration,
  type ParseOptions,
  type ParseOptionsResult
} from 'commander'
export { default as Command } from './command'
export { default as Example } from './example'
