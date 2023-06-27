import { MockLocation } from '~/test/helper/mockLocation'
import { gotoLogin } from '~/util/auth'
import { LOGIN_REDIRECT } from '~/util/static'

Object.assign(process, { client: true })
MockLocation('/assessment')

describe('gotoLogin', () => {
  it('store href', () => {
    gotoLogin()
    expect(localStorage.getItem(LOGIN_REDIRECT)).toBe('/assessment')
  })
})
