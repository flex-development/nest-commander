/**
 * @file ProgramFactory
 * @module nest-commander/ProgramFactory
 */

import {
  cast,
  defaults,
  define,
  fallback,
  type Class
} from '@flex-development/tutils'
import type {
  DynamicModule,
  INestApplicationContext,
  LogLevel
} from '@nestjs/common'
import type { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface'
import { NestFactory } from '@nestjs/core'
import CommandRunnerModule from './command-runner.module'
import type { ParseOptions } from './commander'
import type { CliApplicationContext } from './interfaces'
import { ProgramOptions } from './models'
import { CommandRunnerService } from './providers'

/**
 * CLI program factory options.
 *
 * @see {@linkcode NestApplicationContextOptions}
 * @see {@linkcode ProgramOptions}
 */
type ProgramFactoryOptions = NestApplicationContextOptions & ProgramOptions

/**
 * CLI program factory.
 *
 * @class
 */
class ProgramFactory {
  /**
   * Create a CLI application context from a NestJS application context.
   *
   * @protected
   * @static
   *
   * @param {INestApplicationContext} app - NestJS application context
   * @return {CliApplicationContext} CLI application context
   */
  protected static context(
    app: INestApplicationContext
  ): CliApplicationContext {
    define(app, 'run', {
      /* c8 ignore next 7 */ value: async function run(
        options: { close?: boolean } = {}
      ): Promise<void> {
        await app.get(CommandRunnerService).run()
        fallback(options.close, true) && (await app.close())
        return void 0
      }
    })

    define(app, 'runWith', {
      /* c8 ignore next 9 */ value: async function runWith(
        args: readonly string[] = [],
        options: Partial<ParseOptions & { close?: boolean }> = {}
      ): Promise<void> {
        options.from = fallback(options.from, 'user')
        await app.get(CommandRunnerService).run(args, cast(options))
        fallback(options.close, true) && (await app.close())
        return void args
      }
    })

    return cast<CliApplicationContext>(app)
  }

  /**
   * Create a CLI application context.
   *
   * @see {@linkcode CliApplicationContext}
   * @see {@linkcode DynamicModule}
   * @see {@linkcode ProgramFactoryOptions}
   *
   * @public
   * @static
   * @async
   *
   * @param {Class<any> | DynamicModule} AppModule - Root module
   * @param {ProgramFactoryOptions} [options={}] - Context options
   * @return {Promise<CliApplicationContext>} CLI application context
   */
  public static async create(
    AppModule: Class<any> | DynamicModule,
    options: ProgramFactoryOptions = {}
  ): Promise<CliApplicationContext> {
    return this.context(
      await NestFactory.createApplicationContext(
        CommandRunnerModule.register(options, AppModule),
        defaults(options, { logger: cast<LogLevel[]>(['error', 'warn']) })
      )
    )
  }
}

export { ProgramFactory as default, type ProgramFactoryOptions }
