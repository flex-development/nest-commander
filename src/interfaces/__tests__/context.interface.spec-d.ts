/**
 * @file Type Tests - CliApplicationContext
 * @module nest-commander/interfaces/tests/unit-d/CliApplicationContext
 */

import type { INestApplicationContext } from '@nestjs/common'
import type TestSubject from '../context.interface'

describe('unit-d:interfaces/CliApplicationContext', () => {
  it('should extend INestApplicationContext', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<INestApplicationContext>()
  })

  it('should match [run(options?: { close?: boolean }): Promise<void>]', () => {
    // Arrange
    type Expect = (options?: { close?: boolean }) => Promise<void>

    // Expect
    expectTypeOf<TestSubject>().toHaveProperty('run').toEqualTypeOf<Expect>
  })
})
