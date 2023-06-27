import { stringCut } from '~/util/stringCut'

describe('stringCut', () => {
  it('it will cut off string', () => {
    expect(stringCut('it will cut off string')).toBe('it will cut off stri...')
  })
  it('can change max', () => {
    expect(stringCut('it will cut off string', 10)).toBe('it will cu...')
  })
  it('can change concatString', () => {
    expect(stringCut('it will cut off string', 10, 't...')).toBe(
      'it will cut...'
    )
  })
})
