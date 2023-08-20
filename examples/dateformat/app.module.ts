/**
 * @file Examples - AppModule
 * @module examples/dateformat/AppModule
 */

import { Module } from '@nestjs/common'
import DateCommand from './date.command'
import TimezoneCommand from './timezone.command'

/**
 * CLI application module.
 *
 * @class
 */
@Module({ providers: [DateCommand, TimezoneCommand] })
class AppModule {}

export default AppModule
