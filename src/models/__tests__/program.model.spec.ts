/**
 * @file Unit Tests - Program
 * @module nest-commander/models/tests/unit/Program
 */

import * as commander from '#src/commander'
import ProgramOptions from '../options-program.model'
import TestSubject from '../program.model'

describe('unit:models/Program', () => {
  describe('constructor', () => {
    it('should set #config', () => {
      // Arrange
      const options: ProgramOptions = new ProgramOptions({
        done: vi.fn().mockName('done'),
        version: faker.system.semver()
      })

      // Act
      const result = new TestSubject(options)

      // Expect
      expect(result).to.have.deep.property('config', options).that.is.frozen
    })

    it('should set #parent', () => {
      expect(new TestSubject()).to.have.property('parent', null)
    })

    it('should set program name', () => {
      // Arrange
      const name: string = 'test'

      // Act + Expect
      expect(new TestSubject({ name })).to.have.property('_name', name)
    })
  })

  describe('#enforceSettings', () => {
    it('should return updated command', () => {
      // Arrange
      const command: commander.Command = new commander.Command('test')

      // Act + Expect
      expect(new TestSubject().enforceSettings(command)).to.equal(command)
    })
  })
})
