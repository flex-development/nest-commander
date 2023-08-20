/**
 * @file Unit Tests - ProgramFactory
 * @module nest-commander/tests/unit/ProgramFactory
 */

import AppModule from '#examples/dateformat/app.module'
import TestSubject from '../program.factory'

describe('unit:ProgramFactory', () => {
  describe('.create', () => {
    it('should return CliApplicationContext object', async () => {
      expect(await TestSubject.create(AppModule))
        .to.have.property('run')
        .be.a('function')
    })
  })
})
