/**
 * @file Unit Tests - CliUtilityService
 * @module mkbuild/cli/providers/tests/unit/CliUtilityService
 */

import * as mlly from '@flex-development/mlly'
import { keys, type OneOrMany, type Primitive } from '@flex-development/tutils'
import TestSubject from '../cli-utility.service'

describe('unit:providers/CliUtilityService', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('#parseBoolean', () => {
    it('should return parsed boolean', () => {
      // Arrange
      const cases: [...Parameters<TestSubject['parseBoolean']>, boolean][] = [
        ['0', false],
        ['1', true],
        ['false', false],
        ['n', false],
        ['true', true],
        ['y', true],
        [faker.string.alpha(10), false]
      ]

      // Act + Expect
      cases.forEach(([val, expected]) => {
        expect(subject.parseBoolean(val)).to.equal(expected)
      })
    })
  })

  describe('#parseFloat', () => {
    it('should return parsed float', () => {
      // Arrange
      const cases: Parameters<TestSubject['parseFloat']>[] = [
        [faker.number.float().toString()],
        [faker.string.hexadecimal()]
      ]

      // Act + Expect
      cases.forEach(([val]) => {
        expect(subject.parseFloat(val)).to.equal(Number.parseFloat(val))
      })
    })
  })

  describe('#parseInt', () => {
    it('should return parsed integer', () => {
      // Arrange
      const cases: Parameters<TestSubject['parseInt']>[] = [
        [faker.number.int().toString()],
        [faker.string.hexadecimal(), 16]
      ]

      // Act + Expect
      cases.forEach(([val, rad]) => {
        expect(subject.parseInt(val, rad)).to.equal(Number.parseInt(val, rad))
      })
    })
  })

  describe('#parseList', () => {
    it('should return parsed list', () => {
      // Arrange
      const cases: [...Parameters<TestSubject['parseList']>, Set<string>][] = [
        ['import,node', mlly.CONDITIONS],
        ['import', new Set(['import'])]
      ]

      // Act + Expect
      cases.forEach(([val, expected]) => {
        expect(subject.parseList(val)).to.eql(expected)
      })
    })
  })

  describe('#parseObject', () => {
    it('should return parsed object', () => {
      // Arrange
      const cases: [string, Partial<Record<string, OneOrMany<Primitive>>>][] = [
        ['', {}],
        [
          'arr:[0,1, 2,3],bool:true,num:1,str:hello, world,undef:undefined',
          {
            arr: [0, 1, 2, 3],
            bool: true,
            num: 1,
            str: 'hello, world',
            undef: undefined
          }
        ]
      ]

      // Act + Expect
      cases.forEach(([val, expected]) => {
        expect(subject.parseObject(val)).to.eql(expected)
      })
    })
  })

  describe('#parseRegExp', () => {
    it('should return parsed regular expression', () => {
      // Arrange
      const cases: [string, Partial<RegExp>][] = [
        ['/^hello/i', { flags: 'i', source: '^hello' }],
        ['/world/', { source: 'world' }],
        ['\\..+', { source: '\\..+' }],
        ['.+', { source: '.+' }],
        ['', { source: '(?:)' }]
      ]

      // Act + Expect
      cases.forEach(([val, expected]) => {
        expect(subject.parseRegExp(val)).to.satisfy((result: RegExp) => {
          return keys<Partial<RegExp>, never>(expected).reduce((acc, key) => {
            return acc && result[key] === expected[key]
          }, true)
        })
      })
    })
  })
})
