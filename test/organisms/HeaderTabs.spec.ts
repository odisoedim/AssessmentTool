import { shallowMount } from '@vue/test-utils'
import HeaderTabs from '~/components/organisms/HeaderTabs.vue'
import { expectText } from '~/test/helper/expect'

describe('HeaderTabs', () => {
  it('has 2 tabs', () => {
    const wrap = shallowMount(HeaderTabs, {
      mocks: {
        $route: {
          path: '/',
        },
      },
    })
    const tabs = wrap.findAll('.header-tabs__tab')
    expect(tabs.length).toBe(2)
    expectText(tabs.at(0), 'Assessments')
    expectText(tabs.at(1), 'Dashboard')
  })
  describe('active by different route', () => {
    it('only active `Assessment` when route is `/assessment`', () => {
      const wrap = shallowMount(HeaderTabs, {
        mocks: {
          $route: {
            path: '/assessment',
          },
        },
      })
      const tabs = wrap.findAll('.header-tabs__tab')
      expect(tabs.length).toBe(2)
      expect(tabs.at(0).find('.header-tabs__active-bar').exists()).toBeTruthy()
    })
    it('active `Assessment` when route is not `/organisation`', () => {
      const wrap = shallowMount(HeaderTabs, {
        mocks: {
          $route: {
            path: '/assessment/overview/1',
          },
        },
      })
      const tabs = wrap.findAll('.header-tabs__tab')
      expect(tabs.length).toBe(2)
      expect(tabs.at(0).find('.header-tabs__active-bar').exists()).toBeTruthy()
    })
  })
  describe('can click tab to jump page', () => {
    it('will go to `/assessment` when click `Assessment`', async () => {
      const push = jest.fn()
      const wrap = shallowMount(HeaderTabs, {
        mocks: {
          $route: {
            path: '/',
          },
          $router: {
            push,
          },
        },
      })
      const tabs = wrap.findAll('.header-tabs__tab')
      await tabs.at(0).trigger('click')
      expect(push).toBeCalledWith('/assessment')
    })
    it('should be cursor-not-allowed for dashboard`',  () => {
      
      const wrap = shallowMount(HeaderTabs,{
        mocks: {
          $route: {
            path: '/',
          }
        },
      })
      const tabs = wrap.findAll('.header-tabs__tab').at(1).classes()
     
      expect(tabs).toContain('cursor-not-allowed')
    })
  })
})
