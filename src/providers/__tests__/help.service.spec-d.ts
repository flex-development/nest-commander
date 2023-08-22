/**
 * @file Type Tests - HelpService
 * @module nest-commander/providers/tests/unit-d/HelpService
 */

import type * as commander from 'commander'
import type TestSubject from '../help.service'

describe('unit-d:providers/HelpService', () => {
  it('should extend commander.Help', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<commander.Help>()
  })

  it('should match [helpWidth: number]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('helpWidth')
      .toEqualTypeOf<number>()
  })

  it('should match [tabsize: number]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tabsize')
      .toEqualTypeOf<number>()
  })
})
