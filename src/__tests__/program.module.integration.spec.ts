/**
 * @file Integration Tests - ProgramModule
 * @module nest-commander/tests/integration/ProgramModule
 */

import DateformatModule from '#examples/dateformat/app.module'
import TimezoneCommand from '#examples/dateformat/timezone.command'
import StringUtilsModule from '#examples/string-utils/app.module'
import JoinCommand from '#examples/string-utils/join.command'
import TogglePkgTypeModule from '#examples/toggle-pkg-type/app.module'
import ToggleCommand from '#examples/toggle-pkg-type/toggle.command'
import type { CommandRunner } from '#src/abstracts'
import { CommanderError } from '#src/commander'
import { Program } from '#src/models'
import { CommandTestFactory } from '#src/testing'
import type { DoneFn, ErrorFn, ExitFn } from '#src/types'
import type { Mock } from '#tests/interfaces'
import * as mlly from '@flex-development/mlly'
import { DOT, at, fallback, type EmptyArray } from '@flex-development/tutils'
import type { Type } from '@nestjs/common'
import { TestingModule } from '@nestjs/testing'

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

  describe.each<[string, Type, Type<CommandRunner>, [string, ...string[]]]>([
    [
      'multiple commands',
      StringUtilsModule,
      JoinCommand,
      ['join', 'x', 'y', '-s', DOT]
    ],
    [
      'root command',
      TogglePkgTypeModule,
      ToggleCommand,
      ['--id', mlly.toURL('package.json').href]
    ],
    [
      'subcommands',
      DateformatModule,
      TimezoneCommand,
      ['tz', new Date().toString()]
    ]
  ])('program with %s', (_, AppModule, Runner, args) => {
    let cmd: TestingModule
    let done: Mock<DoneFn>
    let err_command_runner: Error
    let error: Mock<ErrorFn>
    let exit: Mock<ExitFn>
    let program: Program
    let runner: CommandRunner

    beforeAll(async () => {
      cmd = await CommandTestFactory.createTestingCommand({
        done: vi.fn().mockName('done'),
        error: vi.fn().mockName('error'),
        exit: vi.fn().mockName('exit'),
        imports: [AppModule],
        version: faker.system.semver()
      })

      program = cmd.get(Program)
      runner = cmd.get(Runner)
      done = vi.mocked(program.config.done)
      err_command_runner = new Error('CommandRunner.run error')
      error = vi.mocked(program.config.error)
      exit = vi.mocked(program.config.exit)
    })

    beforeEach(() => {
      vi.spyOn(runner, 'run').mockImplementationOnce(vi.fn<EmptyArray>())
    })

    it('should handle command runner error', async () => {
      // Arrange
      vi.spyOn(runner, 'run').mockImplementationOnce(() => {
        throw err_command_runner
      })

      // Act
      await CommandTestFactory.run(cmd, args)

      // Expect
      expect(error).toHaveBeenCalledWith(err_command_runner)
    })

    it('should handle command-line argument parsing error', async () => {
      // Act
      await CommandTestFactory.run(cmd, ['--test'])

      // Expect
      expect(exit).toHaveBeenCalledWith(expect.any(CommanderError))
      expect(at(exit.mock.lastCall, 0)).to.have.property('exitCode', 1)
    })

    it('should output help text when requested', async () => {
      // Arrange
      const arg: string = args[0]

      // Act
      await CommandTestFactory.run(cmd, [
        ...(arg.startsWith('-') ? [] : [arg]),
        '--help'
      ])

      // Expect
      expect(at(stdout.mock.lastCall, 0)).toMatchSnapshot()
    })

    it('should run specified command', async () => {
      // Act
      await CommandTestFactory.run(cmd, args)
      const command = fallback(program.findCommand(args[0]), program)

      // Expect
      expect(runner.run).toHaveBeenCalledOnce()
      expect(runner.run).toHaveBeenCalledWith(command.args, command.opts())
      expect(done).toHaveBeenCalledOnce()
      expect(done).toHaveBeenCalledWith(
        command.args,
        command.optsWithGlobals(),
        command
      )
    })
  })
})
