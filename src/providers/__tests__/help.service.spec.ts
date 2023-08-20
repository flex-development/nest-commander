/**
 * @file Unit Tests - HelpService
 * @module nest-commander/providers/tests/unit/HelpService
 */

import { fallback } from '@flex-development/tutils'
import TestSubject from '../help.service'

describe('unit:providers/HelpService', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('constructor', () => {
    it('should set #helpWidth', () => {
      // Arrange
      const expected: number = fallback(process.stdout.columns, 100)

      // Expect
      expect(subject).to.have.property('helpWidth', expected)
    })

    it('should set #indent', () => {
      expect(subject).to.have.property('indent', 2)
    })

    it('should set #linewidth', () => {
      // Arrange
      const expected: number = subject.helpWidth - subject.indent

      // Expect
      expect(subject).to.have.property('linewidth', expected)
    })

    it('should set #sortOptions', () => {
      expect(subject).to.have.property('sortOptions', true)
    })

    it('should set #sortSubcommands', () => {
      expect(subject).to.have.property('sortSubcommands', true)
    })
  })
})
