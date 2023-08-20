/**
 * @file ProgramModule
 * @module nest-commander/ProgramModule
 */

import { sift } from '@flex-development/tutils'
import { DiscoveryModule } from '@golevelup/nestjs-discovery'
import type { DynamicModule, Type } from '@nestjs/common'
import { Program, ProgramOptions } from './models'
import {
  CliUtilityService,
  CommandRunnerService,
  HelpService
} from './providers'

/**
 * CLI program module.
 *
 * @class
 */
class ProgramModule {
  /**
   * Creates a global CLI program module.
   *
   * @public
   * @static
   *
   * @param {ProgramOptions} options - Program options
   * @param {(DynamicModule | Type)?} [module] - Module to import
   * @return {DynamicModule} Global CLI program module
   */
  public static register(
    options: ProgramOptions,
    module?: DynamicModule | Type
  ): DynamicModule {
    return {
      exports: [CliUtilityService, HelpService, Program],
      global: true,
      imports: sift([DiscoveryModule, module]),
      module: ProgramModule,
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
        HelpService,
        CommandRunnerService
      ]
    }
  }
}

export default ProgramModule
