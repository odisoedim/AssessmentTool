import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import { ref } from '@nuxtjs/composition-api'
import Index from '@/pages/index.vue'
import { useUserinfoMock } from '~/test/helper/mockInject'
import { renderLandingPage } from '~/test/helper/mockData'
import LandingLayoutCenter from '~/components/atoms/LandingLayoutCenter.vue'
import LandingStart from '~/components/organisms/LandingStart.vue'
import LandingPartners from '~/components/organisms/LandingPartners.vue'
import { MockLocation } from '~/test/helper/mockLocation'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()
const useUserinfo = useUserinfoMock()
jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfo.mock(),
}))
useUserinfo.mockResult(false)

const useLandingPageAsync = jest.fn()
jest.mock('~/pages-helper', () => ({
  useLandingPageAsync: () => useLandingPageAsync(),
}))
useLandingPageAsync.mockReturnValue({
  result: ref(renderLandingPage()),
  loading: ref(false),
  error: ref(null),
})
const usePageMeta = jest.fn()
usePageMeta.mockReturnValue(true)
jest.mock('@use/usePageMeta', () => ({
  usePageMeta: (meta: any) => usePageMeta(meta),
}))
MockLocation('/')
describe('index', () => {
  it('can work', () => {
    const wrap = shallowMount(Index, { localVue, router })
    expect(wrap).toBeTruthy()
  })
  it('has correct components', () => {
    const wrap = shallowMount(Index, { localVue, router })
    const landingLayoutCenter = wrap.findComponent(LandingLayoutCenter)
    const landingStart = wrap.findComponent(LandingStart)
    const landingPartners = wrap.findComponent(LandingPartners)
    expect(landingLayoutCenter.exists()).toBeTruthy()
    expect(landingStart.exists()).toBeTruthy()
    expect(landingPartners.exists()).toBeTruthy()
  })
  it('set meta info', async () => {
    jest.clearAllMocks()
    useLandingPageAsync.mockReturnValue({
      result: ref(renderLandingPage()),
      loading: ref(false),
      error: ref(null),
    })
    const wrap = shallowMount(Index, { localVue, router })
    await wrap.vm.$nextTick()
    expect(usePageMeta).toBeCalled()
  })
})
