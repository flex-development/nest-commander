#!/usr/bin/env node

/**
 * @file Examples - toggle-pkg-type
 * @module examples/toggle-pkg-type
 */

import {
  ProgramFactory,
  type CliApplicationContext
} from '@flex-development/nest-commander'
import { get } from '@flex-development/tutils'
import AppModule from './app.module'

/**
 * CLI application context.
 *
 * @const {CliApplicationContext} app
 */
const app: CliApplicationContext = await ProgramFactory.create(AppModule, {
  version: get(
    await import('@flex-development/toggle-pkg-type/package.json', {
      assert: { type: 'json' }
    }),
    'version'
  )
})

await app.run()
