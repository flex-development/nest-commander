/**
 * @file Examples - AppModule
 * @module examples/toggle-pkg-type/AppModule
 */

import { Module } from '@nestjs/common'
import ToggleCommand from './toggle.command'

/**
 * CLI program module.
 *
 * @class
 */
@Module({ providers: [ToggleCommand] })
class AppModule {}

export default AppModule
