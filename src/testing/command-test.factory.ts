/**
 * @file Testing - CommandTestFactory
 * @module nest-commander/testing/CommandTestFactory
 */

import type { ProgramOptions } from '#src/models'
import ProgramModule from '#src/program.module'
import { CommandRunnerService } from '#src/providers'
import { fallback } from '@flex-development/tutils'
import type { ModuleMetadata } from '@nestjs/common'
import {
  Test,
  type TestingModule,
  type TestingModuleBuilder
} from '@nestjs/testing'

/**
 * Command testing options.
 *
 * @see {@linkcode ModuleMetadata}
 * @see {@linkcode ProgramOptions}
 */
type CommandTestOptions = ModuleMetadata & ProgramOptions

/**
 * CLI command testing factory.
 *
 * @class
 * @extends {Test}
 */
class CommandTestFactory extends Test {
  /**
   * Creates and compiles a command testing module.
   *
   * @see {@linkcode CommandTestOptions}
   * @see {@linkcode TestingModule}
   *
   * @public
   * @static
   * @async
   *
   * @param {CommandTestOptions} [options={}] - Command testing options
   * @return {TestingModule} Command testing module
   */
  public static async createTestingCommand(
    options: CommandTestOptions = {}
  ): Promise<TestingModule> {
    return this.createTestingModule(options).compile()
  }

  /**
   * Creates a command testing module builder.
   *
   * @see {@linkcode CommandTestOptions}
   * @see {@linkcode TestingModuleBuilder}
   *
   * @public
   * @static
   * @override
   *
   * @param {CommandTestOptions} [options={}] - Command testing options
   * @return {TestingModuleBuilder} Command testing module builder
   */
  public static override createTestingModule(
    options: CommandTestOptions = {}
  ): TestingModuleBuilder {
    const {
      controllers = [],
      exports = [],
      imports = [],
      providers = [],
      ...opts
    } = options

    return super.createTestingModule({
      controllers,
      exports,
      imports: [...imports, ProgramModule.register(opts)],
      providers
    })
  }

  /**
   * Runs a test command.
   *
   * @see {@linkcode TestingModule}
   *
   * @public
   * @static
   * @async
   *
   * @param {TestingModule} app - Command testing module to run
   * @param {string[]?} [args=[]] - Command arguments
   * @param {{ close?: boolean }?} [options={}] - Run options
   * @param {boolean?} [options.close=true] - Close `app` after running
   * @return {Promise<TestingModule>} Command testing module
   */
  public static async run(
    app: TestingModule,
    args: string[] = [],
    options: { close?: boolean } = {}
  ): Promise<TestingModule> {
    await app.init()
    await app.get(CommandRunnerService).run(args, { from: 'user' })
    fallback(options.close, true) && (await app.close())
    return app
  }
}

export { CommandTestFactory as default, type CommandTestOptions }
