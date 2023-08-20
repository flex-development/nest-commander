#!/usr/bin/env node

/**
 * @file Examples - dateformat
 * @module examples/dateformat
 */

import { ProgramFactory } from '@flex-development/nest-commander'
import AppModule from './app.module'

await (await ProgramFactory.create(AppModule)).run()
