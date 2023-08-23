/**
 * @file Unit Tests - CommandRunner
 * @module nest-commander/abstracts/tests/unit/CommandRunner
 */

import { Command } from '#src/commander'
import TestSubject from '../command-runner.abstract'

describe('unit:abstracts/CommandRunner', () => {
  let subject: TestSubject

  beforeAll(() => {
    // @ts-expect-error ts(18052)
    class Runner extends TestSubject {}
    subject = new Runner()
  })

  describe('#setCommand', () => {
    let command: Command

    beforeAll(() => {
      command = new Command()
    })

    it('should return runner instance', () => {
      expect(subject.setCommand(command)).to.equal(subject)
    })

    it('should set command instance', () => {
      // Act
      subject.setCommand(command)

      // Expect
      expect(subject).to.have.property('command', command)
    })
  })
})
