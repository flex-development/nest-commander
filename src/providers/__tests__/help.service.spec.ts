/**
 * @file Unit Tests - HelpService
 * @module nest-commander/providers/tests/unit/HelpService
 */

import { Command } from '#src/commander'
import { Program } from '#src/models'
import { fallback } from '@flex-development/tutils'
import { masks } from 'dateformat'
import TestSubject from '../help.service'

describe('unit:providers/HelpService', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('constructor', () => {
    it('should set #helpWidth', () => {
      // Arrange
      const expected: number = fallback(process.stdout.columns, 110)

      // Expect
      expect(subject).to.have.property('helpWidth', expected)
    })

    it('should set #showGlobalOptions', () => {
      expect(subject).to.have.property('showGlobalOptions', false)
    })

    it('should set #sortOptions', () => {
      expect(subject).to.have.property('sortOptions', true)
    })

    it('should set #sortSubcommands', () => {
      expect(subject).to.have.property('sortSubcommands', true)
    })

    it('should set #tabsize', () => {
      expect(subject).to.have.property('tabsize', 2)
    })
  })

  describe('#formatHelp', () => {
    let program: Program
    let subcommand: Command

    beforeAll(() => {
      subcommand = new Command('timezone')
        .alias('tz')
        .description('get proper timezone abbreviation or timezone offset')
        .argument('[date]', 'date string')
        .example()
        .example('2023-08-21T21:45:48.850Z')
        .example('tz')
        .example('tz 2023-08-23T00:46:32.292Z')
      program = new Program({ name: 'dateformat', version: '5.0.3' })
        .description('https://github.com/felixge/node-dateformat')
        .argument('[date]', 'date string or timestamp')
        .example()
        .example('--mask=isoTime')
        .option('-g, --gmt', 'convert local time to gmt time', false)
        .option('-m, --mask <mask>', 'date format', masks.default)
        .option('-u, --utc', 'convert local time to utc time', false)
        .option('--verbose', 'enable debug output')
        .addCommand(subcommand)
    })

    it('should return formatted help text', () => {
      expect(subject.formatHelp(program)).toMatchSnapshot()
    })

    it('should return formatted help text for subcommand', () => {
      expect(subject.formatHelp(subcommand)).toMatchSnapshot()
    })
  })
})
