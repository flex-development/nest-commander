/**
 * @file Type Tests - MetadataName
 * @module nest-commander/enums/tests/unit-d/MetadataName
 */

import type TestSubject from '../metadata-name'

describe('unit-d:enums/MetadataName', () => {
  it('should match [COMMAND = "Command"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('COMMAND')
      .toMatchTypeOf<'Command'>()
  })

  it('should match [OPTION = "Option"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('OPTION')
      .toMatchTypeOf<'Option'>()
  })

  it('should match [RUNNER = "Runner"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('RUNNER')
      .toMatchTypeOf<'Runner'>()
  })
})
