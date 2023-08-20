/**
 * @file Integration Tests - ProgramModule
 * @module nest-commander/tests/integration/ProgramModule
 */

import DateformatModule from '#examples/dateformat/app.module'
import StringUtilsModule from '#examples/string-utils/app.module'
import TogglePkgTypeModule from '#examples/toggle-pkg-type/app.module'
import { ProgramOptions } from '#src/models'
import { CommandTestFactory } from '#src/testing'
import type { Mock } from '#tests/interfaces'
import togglePkgType from '@flex-development/toggle-pkg-type'
import {
  alphabetize,
  at,
  DOT,
  get,
  identity,
  join,
  type Times
} from '@flex-development/tutils'
import { TestingModule } from '@nestjs/testing'
import { CommanderError } from 'commander'
import { formatTimezone } from 'dateformat'

vi.mock('@flex-development/toggle-pkg-type')
vi.mock('dateformat')

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
      const args: Times<3, string> = ['z', 'y', 'x']
      const args_a: Times<4, string> = ['alphabetize', ...args]
      const args_j: Times<6, string> = ['join', ...args, '-s', DOT]

      // Act
      await CommandTestFactory.run(cmd, args_a)
      await CommandTestFactory.run(cmd, args_j)

      // Expect
      expect(log).toHaveBeenCalledWith(join(alphabetize(args, identity), ' '))
      expect(log).toHaveBeenCalledWith(join(args, DOT))
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
    })

    it('should run root command', async () => {
      // Arrange
      const id: string = faker.system.directoryPath()
      const args: Times<3, string> = ['off', '-i', id]

      // Act
      await CommandTestFactory.run(cmd, args)

      // Expect
      expect(togglePkgType).toHaveBeenCalledWith(args[0], id)
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

      // Expect
      expect(log).toHaveBeenCalledWith(formatTimezone(args[1]))
    })
  })
})
