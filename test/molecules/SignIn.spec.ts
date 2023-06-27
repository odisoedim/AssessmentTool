import { mount, shallowMount } from '@vue/test-utils'
import SignIn from '~/components/molecules/SignIn.vue'
import { expectText } from '~/test/helper/expect'
import { MockLocation } from '~/test/helper/mockLocation'
import { MockEnv } from '~/test/helper/mockEnv'
import { LOGIN_REDIRECT } from '~/util/static'
describe('SignIn', () => {
  it('can work', () => {
    const wrap = shallowMount(SignIn)
    expect(wrap).toBeTruthy()
    expectText(wrap, 'Sign in/Sign up')
  })
  it('can click, it will save current href and link to Auth0', async () => {
    process.client = true
    MockLocation('https://test.com')
    MockEnv({
      AUTH0: 'https://helloAuth0',
    })
    const wrap = mount(SignIn)
    expect(location.href).toBe('https://test.com')
    expect(localStorage.getItem(LOGIN_REDIRECT)).toBeFalsy()

    await wrap.trigger('click')
    expect(location.href.split('?')[0]).toBe('https://helloAuth0')
  })
})
