/**
 * @file Unit Tests - Command
 * @module nest-commander/commander/tests/unit/Command
 */

import { define } from '@flex-development/tutils'
import TestSubject from '../command'

describe('unit:commander/Command', () => {
  describe('constructor', () => {
    it('should set #examples', () => {
      // Act
      const result = new TestSubject()

      // Expect
      expect(result).to.have.deep.property('examples', [])
    })
  })

  describe('#createCommand', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject('dateformat')
    })

    it('should return new command', () => {
      // Arrange
      const name: string = 'timezone'

      // Act
      const result = subject.createCommand(name)

      // Expect
      expect(result).to.be.instanceof(TestSubject).with.property('_name', name)
      expect(subject).to.have.deep.property('commands', [])
    })
  })

  describe('#version', () => {
    let version: string
    let subject: TestSubject

    beforeAll(() => {
      version = faker.system.semver()
      subject = define(new TestSubject(), '_version', { value: version })
    })

    it('should return command instance if version is empty string', () => {
      for (const v of ['', ' ']) expect(subject.version(v)).to.equal(subject)
    })

    it('should return current version if version is undefined', () => {
      expect(subject.version()).to.equal(version)
    })
  })
})
