/**
 * @file Configuration - Build
 * @module config/build
 */

import { defineBuildConfig, type Config } from '@flex-development/mkbuild'
import pathe from '@flex-development/pathe'
import pkg from './package.json' assert { type: 'json' }
import tsconfig from './tsconfig.build.json' assert { type: 'json' }

/**
 * Build configuration options.
 *
 * @const {Config} config
 */
const config: Config = defineBuildConfig({
  charset: 'utf8',
  entries: [
    { dts: 'only' },
    { dts: false, pattern: ['abstracts/**', 'enums/**'] },
    {
      dts: false,
      pattern: ['*.ts', 'providers/**', 'utils/**'],
      sourceRoot: 'file' + pathe.delimiter + pathe.sep.repeat(2),
      sourcemap: true
    }
  ],
  minifySyntax: true,
  target: [
    pkg.engines.node.replace(/^\D+/, 'node'),
    tsconfig.compilerOptions.target
  ],
  tsconfig: 'tsconfig.build.json'
})

export default config
