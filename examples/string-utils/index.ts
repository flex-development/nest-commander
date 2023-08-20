#!/usr/bin/env node

/**
 * @file Examples - string-utils
 * @module examples/string-utils
 */

import { ProgramFactory } from '@flex-development/nest-commander'
import AppModule from './app.module'

await (await ProgramFactory.create(AppModule)).run()
