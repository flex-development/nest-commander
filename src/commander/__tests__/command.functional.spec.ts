/**
 * @file Functional Tests - Command
 * @module nest-commander/commander/tests/functional/Command
 */

import type { Spy } from '#tests/interfaces'
import { Command as CommandBase } from 'commander'
import TestSubject from '../command'
import Example from '../example'

describe('functional:commander/Command', () => {
  describe('#addCommand', () => {
    let spy: Spy<CommandBase['addCommand']>
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject()
    })

    beforeEach(() => {
      spy = vi.spyOn(CommandBase.prototype, 'addCommand')
    })

    it('should add subcommand', () => {
      // Arrange
      const cmd: TestSubject = new TestSubject('test')

      // Act
      subject.addCommand(cmd)

      // Expect
      expect(spy).toHaveBeenCalledWith(cmd, undefined)
      expect(subject).to.have.deep.property('commands', [cmd])
    })
  })

  describe('#example', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject('timezone').alias('tz')
    })

    it('should add unique command example', () => {
      // Act
      subject.example()
      subject.example()
      subject.example(subject.alias())

      // Expect
      expect(subject).to.have.deep.property('examples', [
        new Example(subject.name()),
        new Example(subject.alias())
      ])
    })
  })

  describe('#version', () => {
    let spy: Spy<CommandBase['version']>
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject()
    })

    beforeEach(() => {
      spy = vi.spyOn(CommandBase.prototype, 'version')
    })

    it('should configure command version', () => {
      // Arrange
      const description: string = 'print version number'
      const flags: string = '-v, --version'
      const version: string = faker.system.semver()

      // Act
      subject.version(version + ' '.repeat(2))

      // Expect
      expect(spy).toHaveBeenCalledWith(version, flags, description)
      expect(subject).to.have.property('_version', version)
    })
  })
})
