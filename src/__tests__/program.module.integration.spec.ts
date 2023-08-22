/**
 * @file Integration Tests - ProgramModule
 * @module nest-commander/tests/integration/ProgramModule
 */

import DateformatModule from '#examples/dateformat/app.module'
import StringUtilsModule from '#examples/string-utils/app.module'
import TogglePkgTypeModule from '#examples/toggle-pkg-type/app.module'
import { Program, ProgramOptions } from '#src/models'
import { CommandTestFactory } from '#src/testing'
import type { Mock } from '#tests/interfaces'
import togglePkgType from '@flex-development/toggle-pkg-type'
import { DOT, at, get, type Times } from '@flex-development/tutils'
import { TestingModule } from '@nestjs/testing'
import { CommanderError } from 'commander'

vi.mock('@flex-development/toggle-pkg-type')

describe('integration:ProgramModule', () => {
  let exit: Mock<NodeJS.Process['exit']>
  let log: Mock<Console['log']>
  let stderr: Mock<NodeJS.Process['stderr']['write']>
  let stdout: Mock<NodeJS.Process['stdout']['write']>

  beforeAll(() => {
    exit = vi.fn<[number?], never>().mockName('process.exit')
    log = vi.fn().mockName('console.log')
    stderr = vi.fn().mockName('process.stderr.write')
    stdout = vi.fn().mockName('process.stdout.write')
  })

  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(log)
    vi.spyOn(process, 'exit').mockImplementation(exit)
    vi.spyOn(process.stderr, 'write').mockImplementation(stderr)
    vi.spyOn(process.stdout, 'write').mockImplementation(stdout)
  })

  describe('error handling', () => {
    let cmd: TestingModule
    let options: ProgramOptions

    beforeAll(async () => {
      cmd = await CommandTestFactory.createTestingCommand({
        error: vi.fn().mockName('error'),
        exit: vi.fn().mockName('exit'),
        imports: [TogglePkgTypeModule]
      })

      options = cmd.get(ProgramOptions)
    })

    it('should call error handler on command error', async () => {
      // Arrange
      vi.mocked(togglePkgType).mockImplementationOnce(() => {
        throw new Error('')
      })

      // Act
      await CommandTestFactory.run(cmd)
      const arg = at(vi.mocked(options.error!).mock.lastCall, 0)

      // Expect
      expect(options.error).toHaveBeenCalled()
      expect(arg).to.be.instanceof(Error).and.have.property('message', '')
    })

    it('should call exit override on commander error', async () => {
      // Act
      await CommandTestFactory.run(cmd, ['1'])
      const arg = at(vi.mocked(options.exit!).mock.lastCall, 0)

      // Expect
      expect(options.exit).toHaveBeenCalled()
      expect(arg).to.be.instanceof(CommanderError)
      expect(arg).to.have.property('code', 'commander.invalidArgument')
      expect(arg).to.have.property('exitCode', 1)
    })
  })

  describe('multiple commands', () => {
    let cmd: TestingModule
    let log: Mock<Console['log']>
    let stdout: Mock<NodeJS.Process['stdout']['write']>

    beforeAll(async () => {
      cmd = await CommandTestFactory.createTestingCommand({
        done: vi.fn().mockName('done'),
        imports: [StringUtilsModule]
      })

      log = vi.fn().mockName('console.log')
      stdout = vi.fn().mockName('process.stdout.write')
    })

    beforeEach(() => {
      vi.spyOn(console, 'log').mockImplementation(log)
      vi.spyOn(process.stdout, 'write').mockImplementation(stdout)
    })

    it('should run command', async () => {
      // Arrange
      const cases: [string, ...string[]][] = [
        ['alpha', 'z', 'y', 'x'],
        ['join', 'x', 'y', '-s', DOT]
      ]

      // Act + Expect
      for (const args of cases) {
        await CommandTestFactory.run(cmd, args)
        const command = cmd.get(Program).findCommand(args[0])!

        expect(cmd.get(ProgramOptions).done).toHaveBeenCalledWith(
          command.args,
          command.optsWithGlobals(),
          command
        )
      }
    })
  })

  describe('root commands', () => {
    let cmd: TestingModule

    beforeAll(async () => {
      cmd = await CommandTestFactory.createTestingCommand({
        done: vi.fn().mockName('done'),
        imports: [TogglePkgTypeModule],
        version: get(
          await import('@flex-development/toggle-pkg-type/package.json'),
          'version'
        )
      })

      log = vi.fn().mockName('console.log')
      stdout = vi.fn().mockName('process.stdout.write')
    })

    it('should run root command', async () => {
      // Arrange
      const id: string = faker.system.directoryPath()
      const args: Times<3, string> = ['off', '-i', id]
      const program: Program = cmd.get(Program)

      // Act
      await CommandTestFactory.run(cmd, args)

      // Expect
      expect(cmd.get(ProgramOptions).done).toHaveBeenCalledWith(
        program.args,
        program.opts(),
        program
      )
    })
  })

  describe('subcommands', () => {
    let cmd: TestingModule
    let log: Mock<Console['log']>
    let stdout: Mock<NodeJS.Process['stdout']['write']>

    beforeAll(async () => {
      cmd = await CommandTestFactory.createTestingCommand({
        done: vi.fn().mockName('done'),
        imports: [DateformatModule]
      })

      log = vi.fn().mockName('console.log')
      stdout = vi.fn().mockName('process.stdout.write')
    })

    beforeEach(() => {
      vi.spyOn(console, 'log').mockImplementation(log)
      vi.spyOn(process.stdout, 'write').mockImplementation(stdout)
    })

    it('should run subcommand', async () => {
      // Arrange
      const args: Times<2, string> = ['tz', new Date().toString()]

      // Act
      await CommandTestFactory.run(cmd, args)
      const command = cmd.get(Program).findCommand(args[0])!

      // Expect
      expect(cmd.get(ProgramOptions).done).toHaveBeenCalledWith(
        command.args,
        command.optsWithGlobals(),
        command
      )
    })
  })
})
