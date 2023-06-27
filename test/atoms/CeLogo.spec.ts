import { mount, RouterLinkStub } from '@vue/test-utils'
import CeLogo from '~/components/atoms/CeLogo.vue'
import { expectText } from '~/test/helper/expect'

describe('CeLogo', () => {
  it('can work', () => {
    const wrap = mount(CeLogo)
    expect(wrap).toBeTruthy()
    const texts = wrap.findAll('p')
    expectText(texts.at(0), 'CIRCULARITY')
    expectText(texts.at(1), 'ASSESSMENT')
  })

  it('should link logo to assessment page when clicked ', async () => {
    const wrap = mount(CeLogo, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })

    await wrap.vm.$nextTick()
    const routerLinkStub = wrap.findComponent(RouterLinkStub)
    expect(routerLinkStub.vm).toBeTruthy()
    expect(routerLinkStub.vm.$props.to).toBe('/')
  })
})
