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
import type { NestApplicationContextOptions as NestContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface'
import { NestFactory } from '@nestjs/core'
import type { ParseOptions } from './commander'
import type { CliApplicationContext } from './interfaces'
import { ProgramOptions } from './models'
import ProgramModule from './program.module'
import { CommandRunnerService } from './providers'

/**
 * CLI program factory.
 *
 * @class
 */
class ProgramFactory {
  /**
   * Creates a CLI application context from a NestJS application context.
   *
   * @private
   * @static
   *
   * @param {INestApplicationContext} app - NestJS application context
   * @return {CliApplicationContext} CLI application context
   */
  static #context(app: INestApplicationContext): CliApplicationContext {
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
   * Creates a CLI application context.
   *
   * @see {@linkcode CliApplicationContext}
   * @see {@linkcode DynamicModule}
   * @see {@linkcode NestContextOptions}
   * @see {@linkcode ProgramOptions}
   *
   * @public
   * @static
   * @async
   *
   * @param {Class<any> | DynamicModule} AppModule - Root module
   * @param {NestContextOptions & ProgramOptions} [options={}] - Context options
   * @return {Promise<CliApplicationContext>} CLI application context
   */
  public static async create(
    AppModule: Class<any> | DynamicModule,
    options: NestContextOptions & ProgramOptions = {}
  ): Promise<CliApplicationContext> {
    return this.#context(
      await NestFactory.createApplicationContext(
        ProgramModule.register(new ProgramOptions(options), AppModule),
        defaults(options, { logger: cast<LogLevel[]>(['error', 'warn']) })
      )
    )
  }
}

export default ProgramFactory
