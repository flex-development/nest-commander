/**
 * @file Unit Tests - Example
 * @module nest-commander/commander/tests/unit/Example
 */

import { trim, trimStart } from '@flex-development/tutils'
import TestSubject from '../example'

describe('unit:commander/Example', () => {
  let prefix: string
  let subject: TestSubject
  let text: string

  beforeAll(() => {
    prefix = ' npm_package_json=/path/to/directory/or/manifest '
    text = ' toggle-pkg-type'
    subject = new TestSubject(text, prefix)
  })

  describe('constructor', () => {
    it('should set #prefix', () => {
      expect(subject).to.have.property('prefix', trim(prefix))
    })

    it('should set #text', () => {
      expect(subject).to.have.property('text', trimStart(text))
    })
  })

  describe('#toString', () => {
    it('should return stringified example', () => {
      expect(subject.toString()).to.equal(`${trim(prefix)} ${trimStart(text)}`)
    })
  })
})
