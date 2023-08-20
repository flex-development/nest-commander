/**
 * @file Unit Tests - ProgramOptions
 * @module nest-commander/models/tests/unit/ProgramOptions
 */

import pkg from '#pkg' assert { type: 'json' }
import type { DoneFn, ErrorFn, ExitFn } from '#src/types'
import type { Mock } from '#tests/interfaces'
import TestSubject from '../options-program.model'

describe('unit:models/ProgramOptions', () => {
  describe('constructor', () => {
    it('should set #combine', () => {
      // Arrange
      const combine: boolean = true

      // Act
      const result = new TestSubject({ combine })

      // Expect
      expect(result).to.have.property('combine', combine)
    })

    it('should set #done', () => {
      // Arrange
      const done: Mock<DoneFn> = vi.fn().mockName('done')

      // Act
      const result = new TestSubject({ done })

      // Expect
      expect(result).to.have.property('done', done)
    })

    it('should set #error', () => {
      // Arrange
      const error: Mock<ErrorFn> = vi.fn().mockName('error')

      // Act
      const result = new TestSubject({ error })

      // Expect
      expect(result).to.have.property('error', error)
    })

    it('should set #excess', () => {
      // Arrange
      const excess: boolean = true

      // Act
      const result = new TestSubject({ excess })

      // Expect
      expect(result).to.have.property('excess', excess)
    })

    it('should set #exit', () => {
      // Arrange
      const exit: Mock<ExitFn> = vi.fn().mockName('exit')

      // Act
      const result = new TestSubject({ exit })

      // Expect
      expect(result).to.have.property('exit', exit)
    })

    it('should set #passthrough', () => {
      // Arrange
      const passthrough: boolean = true

      // Act
      const result = new TestSubject({ passthrough })

      // Expect
      expect(result).to.have.property('passthrough', passthrough)
    })

    it('should set #positional', () => {
      // Arrange
      const positional: boolean = false

      // Act
      const result = new TestSubject({ positional })

      // Expect
      expect(result).to.have.property('positional', positional)
    })

    it('should set #unknown', () => {
      // Arrange
      const unknown: boolean = true

      // Act
      const result = new TestSubject({ unknown })

      // Expect
      expect(result).to.have.property('unknown', unknown)
    })

    it('should set #version', () => {
      // Arrange
      const version: string = pkg.version

      // Act
      const result = new TestSubject({ version })

      // Expect
      expect(result).to.have.property('version', version)
    })
  })
})
