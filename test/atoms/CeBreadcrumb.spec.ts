import { mount, shallowMount } from '@vue/test-utils'
import CeBreadcrumb from '~/components/atoms/CeBreadcrumb.vue'
import { expectAttr, expectText } from '~/test/helper/expect'

describe('CeBreadcrumb', () => {
  it('can work', () => {
    const wrap = shallowMount(CeBreadcrumb)
    expect(wrap).toBeTruthy()
  })
  it('can render breadcrumbs', () => {
    const wrap = mount(CeBreadcrumb, {
      propsData: {
        paths: [
          { nuxtLink: true, id: '1', title: 'lv1', to: '/test' },
          {
            nuxtLink: true,
            id: '2',
            title: 'lv2',
            to: `/test/lv2`,
          },
          {
            nuxtLink: true,
            id: '3',
            title: 'lv3',
            to: `/test/lv3`,
          },
        ],
      },
    })
    const links = wrap.findAll('a')
    expectText(links.at(0), 'lv1')
    expectAttr(links.at(0), { href: '/test' })
    expectText(links.at(1), 'lv2')
    expectAttr(links.at(1), { href: '/test/lv2' })
    expectText(links.at(2), 'lv3')
    expectAttr(links.at(2), { href: '/test/lv3' })
  })
})
