/**
 * @file CommandRunnerModule
 * @module nest-commander/CommandRunnerModule
 */

import { sift, type Class } from '@flex-development/tutils'
import { DiscoveryModule } from '@golevelup/nestjs-discovery'
import { Module, type DynamicModule } from '@nestjs/common'
import { Program, ProgramOptions } from './models'
import {
  CliUtilityService,
  CommandRunnerService,
  HelpService
} from './providers'

/**
 * Command runner module.
 *
 * @class
 */
@Module({})
class CommandRunnerModule {
  /**
   * Register a global command runner module.
   *
   * @public
   * @static
   *
   * @param {ProgramOptions} options - CLI program options
   * @param {(Class<any> | DynamicModule)?} [module] - Module to import
   * @return {DynamicModule} Global command runner module
   */
  public static register(
    options: ProgramOptions,
    module?: Class<any> | DynamicModule
  ): DynamicModule {
    return {
      exports: [CliUtilityService, HelpService, Program],
      global: true,
      imports: sift([DiscoveryModule, module]),
      module: CommandRunnerModule,
      providers: [
        {
          provide: ProgramOptions,
          useValue: new ProgramOptions(options)
        },
        {
          inject: [ProgramOptions, HelpService],
          provide: Program,
          useFactory(options: ProgramOptions, help: HelpService): Program {
            return new Program(options).configureHelp(help)
          }
        },
        CliUtilityService,
        CommandRunnerService,
        HelpService
      ]
    }
  }
}

export default CommandRunnerModule
