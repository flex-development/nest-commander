/**
 * @file Functional Tests - Program
 * @module nest-commander/models/tests/functional/Program
 */

import * as commander from '#src/commander'
import type { DoneFn, ExitFn } from '#src/types'
import type { Mock, Spy } from '#tests/interfaces'
import { get, type EmptyArray } from '@flex-development/tutils'
import TestSubject from '../program.model'

describe('functional:models/Program', () => {
  describe('constructor', () => {
    let combine: Spy<TestSubject['combineFlagAndOptionalValue']>
    let excess: Spy<TestSubject['allowExcessArguments']>
    let exit: Mock<ExitFn>
    let exitOverride: Spy<TestSubject['exitOverride']>
    let passthrough: Spy<TestSubject['passThroughOptions']>
    let positional: Spy<TestSubject['enablePositionalOptions']>
    let subject: TestSubject
    let unknown: Spy<TestSubject['allowUnknownOption']>
    let version: Spy<TestSubject['version']>

    beforeAll(() => {
      exit = vi.fn().mockName('exit')
    })

    beforeEach(() => {
      combine = vi.spyOn(TestSubject.prototype, 'combineFlagAndOptionalValue')
      excess = vi.spyOn(TestSubject.prototype, 'allowExcessArguments')
      exitOverride = vi.spyOn(TestSubject.prototype, 'exitOverride')
      passthrough = vi.spyOn(TestSubject.prototype, 'passThroughOptions')
      positional = vi.spyOn(TestSubject.prototype, 'enablePositionalOptions')
      unknown = vi.spyOn(TestSubject.prototype, 'allowUnknownOption')
      version = vi.spyOn(TestSubject.prototype, 'version')

      subject = new TestSubject({
        excess: true,
        exit,
        passthrough: true,
        positional: true,
        unknown: true,
        version: {
          description: 'output version number',
          flags: '-V, --version',
          version: faker.system.semver()
        }
      })
    })

    it('should configure argument and option parsing', () => {
      expect(combine).toHaveBeenCalledWith(subject.config.combine)
      expect(excess).toHaveBeenCalledWith(subject.config.excess)
      expect(passthrough).toHaveBeenCalledWith(subject.config.passthrough)
      expect(positional).toHaveBeenCalledWith(subject.config.positional)
      expect(unknown).toHaveBeenCalledWith(subject.config.unknown)
    })

    it('should configure exit override', () => {
      expect(exitOverride).toHaveBeenCalledWith(exit)
    })

    it('should configure program version', () => {
      expect(version).toHaveBeenCalledWith(
        get(subject.config.version, 'version'),
        get(subject.config.version, 'flags'),
        get(subject.config.version, 'description')
      )
    })
  })

  describe('#enforceSettings', () => {
    let command: commander.Command
    let copy: Spy<commander.Command['copyInheritedSettings']>
    let passthrough: Spy<commander.Command['passThroughOptions']>
    let subject: TestSubject
    let unknown: Spy<commander.Command['allowUnknownOption']>

    beforeEach(() => {
      copy = vi.spyOn(commander.Command.prototype, 'copyInheritedSettings')
      passthrough = vi.spyOn(commander.Command.prototype, 'passThroughOptions')
      unknown = vi.spyOn(commander.Command.prototype, 'allowUnknownOption')
      command = new commander.Command('test')

      subject = new TestSubject({
        passthrough: true,
        positional: true,
        unknown: true
      })
    })

    it('should copy common settings to command', () => {
      // Act
      subject.enforceSettings(command)

      // Expect
      expect(copy).toHaveBeenCalledWith(subject)
      expect(passthrough).toHaveBeenCalledWith(subject.config.passthrough)
      expect(unknown).toHaveBeenCalledWith(subject.config.unknown)
    })
  })

  describe('#findCommand', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({ name: 'string-utils' })
      subject.addCommand(new commander.Command('alphabetize').alias('alpha'))
      subject.addCommand(new commander.Command('join'))
    })

    it('should return matching command given command alias', () => {
      expect(subject.findCommand('alpha')).to.be.instanceof(commander.Command)
    })

    it('should return matching command given command name', () => {
      ;['alphabetize', 'join'].forEach(cmd => {
        expect(subject.findCommand(cmd))
          .to.be.instanceof(commander.Command)
          .with.property('_name', cmd)
      })
    })

    it('should return undefined if matching command is not found', () => {
      expect(subject.findCommand('vin')).to.be.undefined
    })
  })

  describe('#parseAsync', () => {
    let args: string[]
    let done: Mock<DoneFn>
    let from: commander.ParseOptions['from']
    let optsWithGlobals: Spy<TestSubject['optsWithGlobals']>
    let parseAsync: Spy<commander.Command['parseAsync']>
    let subject: TestSubject

    beforeAll(() => {
      args = ['arg', '--test']
      done = vi.fn().mockName('done')
      from = 'user'
      subject = new TestSubject({ done })
    })

    beforeEach(async () => {
      optsWithGlobals = vi.spyOn(subject, 'optsWithGlobals')
      parseAsync = vi.spyOn(commander.Command.prototype, 'parseAsync')
      parseAsync.mockImplementationOnce(vi.fn<EmptyArray>())
      await subject.parseAsync(args, { from })
    })

    it('should parse command line arguments', () => {
      expect(parseAsync).toHaveBeenCalledWith(args, { from })
    })

    it('should run done callback', () => {
      expect(optsWithGlobals).toHaveBeenCalledOnce()
      expect(done).toHaveBeenCalledWith(
        subject.args,
        subject.optsWithGlobals(),
        subject
      )
    })
  })
})
