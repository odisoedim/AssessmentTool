import { useUppercase } from '@use/useUppercase'

describe('useUppercase', () => {
  it('can uppercase first letter', () => {
    const str = useUppercase('hello')
    expect(str.value).toBe('Hello')
  })
  it('will return empty string if the str is empty', () => {
    const str = useUppercase('')
    expect(str.value).toBe('')
  })
})
