/**
 * @file Type Tests - CliApplicationContext
 * @module nest-commander/interfaces/tests/unit-d/CliApplicationContext
 */

import type { ParseOptions } from '#src/commander'
import type { INestApplicationContext } from '@nestjs/common'
import type TestSubject from '../context.interface'

describe('unit-d:interfaces/CliApplicationContext', () => {
  it('should extend INestApplicationContext', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<INestApplicationContext>()
  })

  it('should match [run(opts?: { close?: boolean }): Promise<void>]', () => {
    // Arrange
    type Expect = (opts?: { close?: boolean }) => Promise<void>

    // Expect
    expectTypeOf<TestSubject>().toHaveProperty('run').toEqualTypeOf<Expect>
  })

  it('should match [runWith(args?: readonly string[], opts?: Partial<ParseOptions & { close?: boolean }>]', () => {
    // Arrange
    type Expect = (
      args?: readonly string[],
      opts?: Partial<ParseOptions & { close?: boolean }>
    ) => Promise<void>

    // Expect
    expectTypeOf<TestSubject>().toHaveProperty('runWith').toEqualTypeOf<Expect>
  })
})
