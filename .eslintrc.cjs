/**
 * @file ESLint Configuration - Root
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

/**
 * @type {import('eslint').Linter.Config}
 * @const config - ESLint configuration object
 */
const config = {
  extends: ['./.eslintrc.base.cjs'],
  overrides: [
    ...require('./.eslintrc.base.cjs').overrides,
    {
      files: ['src/models/options-program.model.ts'],
      rules: {
        'unicorn/no-process-exit': 0
      }
    },
    {
      files: ['src/testing/command-test.factory.ts'],
      rules: {
        'unicorn/prefer-module': 0
      }
    }
  ],
  root: true
}

module.exports = config
