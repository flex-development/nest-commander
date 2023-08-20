/**
 * @file Examples - AppModule
 * @module examples/string-utils/AppModule
 */

import { Program } from '@flex-development/nest-commander'
import { Module } from '@nestjs/common'
import AlphabetizeCommand from './alphabetize.command'
import JoinCommand from './join.command'

/**
 * CLI application module.
 *
 * @class
 */
@Module({ providers: [AlphabetizeCommand, JoinCommand] })
class AppModule {
  /**
   * Creates a new CLI application module.
   *
   * @param {Program} program - CLI program instance
   */
  constructor(program: Program) {
    program.name('string-utils')
    program.description('String utilities')
  }
}

export default AppModule
