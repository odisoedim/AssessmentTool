import { provideApollo, useApollo } from '@use/apollo'
import { mount } from '@vue/test-utils'
import { GraphqlFrom } from '~/type/enum'
import { useCookieMock } from '~/test/helper/mockInject'
const useCookies = useCookieMock()
jest.mock('@use/useCookie', () => ({
  useCookies: () => useCookies.mock(),
}))
global.fetch = jest.fn()
describe('provide/use apollo', () => {
  it('can work', () => {
    const wrap = mount({
      template: '<div></div>',
      setup() {
        provideApollo({
          [GraphqlFrom.CMS]: 'http://cms/graphql',
          [GraphqlFrom.KH]: 'http://kh/graphql',
        })
        useApollo()
      },
    })
    expect(wrap).toBeTruthy()
  })
})
