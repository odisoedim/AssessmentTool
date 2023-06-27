import { toggleBodyOverflow } from '~/util/globalStyle'
import { NO_SCROLL } from '~/util/static'

describe('toggleBodyOverflow', () => {
  it('can set class for body', () => {
    toggleBodyOverflow(true)
    expect(document.body.classList.contains(NO_SCROLL)).toBeTruthy()
    toggleBodyOverflow(false)
    expect(document.body.classList.contains(NO_SCROLL)).toBeFalsy()
  })
})
