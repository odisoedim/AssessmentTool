import {
  organisationSymbol,
  provideOrganisation,
  useOrganisation,
} from '@use/useOrganisation'
import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { renderAssessment } from '../helper/mockData'
import { useCookieMock, useUserinfoMock } from '~/test/helper/mockInject'
import { expectText } from '~/test/helper/expect'
import { ORG_KEY } from '~/util/static'
import { useCommonMock } from '~/test/helper/mockApi'

const useCookies = useCookieMock()
jest.mock('@use/useCookie', () => ({
  useCookies: () => useCookies.mock(),
}))

const useUserinfo = useUserinfoMock()
jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfo.mock(),
}))
const useFetchOrganisationInformation = useCommonMock()

jest.mock('~/api/organisation', () => ({
  useFetchOrganisationInformation: () => useFetchOrganisationInformation.mock(),
}))
useFetchOrganisationInformation.mockSuccess({})

const push = jest.fn()
const parent = () =>
  mount(
    {
      template: '<div></div>',
      setup() {
        provideOrganisation()
      },
    },
    {
      mocks: {
        $router: {
          push,
        },
      },
    }
  ).vm
useUserinfo.mockResult(true, ['11', '21'])

describe('useOrganisation', () => {
  describe('organisationSymbol', () => {
    it('is a symbol', () => {
      expect(typeof organisationSymbol).toBe('symbol')
    })
  })
  describe('use/provide organisation', () => {
    it('will get organisation from userinfo', () => {
      jest.clearAllMocks()
      const wrap = mount(
        {
          template: `<div>
            <span class='org' v-for='i in organisations' :key='i.organizationId'>
              {{i.organizationId}}
            </span>
          </div>`,
          setup() {
            const { organisations } = useOrganisation()
            return { organisations }
          },
        },
        {
          parent: parent(),
        }
      )
      const $org = wrap.findAll('.org')
      expect($org.length).toBe(2)
      expectText($org.at(0), '11')
      expectText($org.at(1), '21')
    })
    it('get current organisation from cookie if it set before', () => {
      useCookies.get.mockReturnValue('21')
      const wrap = mount(
        {
          template: `<div>{{ currentOrganisation }}</div>`,
          setup() {
            const { currentOrganisation } = useOrganisation()
            return { currentOrganisation }
          },
        },
        {
          parent: parent(),
        }
      )
      expect(useCookies.get).lastCalledWith(ORG_KEY)
      expectText(wrap, '21')
    })
    it('get current organisation from organisations if it not set before', () => {
      useCookies.get.mockReturnValue('')
      const wrap = mount(
        {
          template: `<div>{{ currentOrganisation }}</div>`,
          setup() {
            const { currentOrganisation } = useOrganisation()
            return { currentOrganisation }
          },
        },
        {
          parent: parent(),
        }
      )
      expect(useCookies.get).lastCalledWith(ORG_KEY)
      expectText(wrap, '11')
    })
    it('remove current organisation if user not has organisations', () => {
      useUserinfo.mockResult(true, [])
      const wrap = mount(
        {
          template: `<div>{{ currentOrganisation }}</div>`,
          setup() {
            const { currentOrganisation } = useOrganisation()
            return { currentOrganisation }
          },
        },
        {
          parent: parent(),
        }
      )
      expectText(wrap, '')
    })
    it('can get detail of current organisation', () => {
      useUserinfo.mockResult(true, ['11', '21'])
      const wrap = mount(
        {
          template: `<div v-if='getOrganisation'>{{ getOrganisation.organizationName }}</div>`,
          setup() {
            const { getOrganisation } = useOrganisation()
            return { getOrganisation }
          },
        },
        {
          parent: parent(),
        }
      )
      expectText(wrap, '11_name')
    })
    describe('can set current organisation', () => {
      it('ignore the same organisation', async () => {
        jest.clearAllMocks()
        useUserinfo.mockResult(true, ['11', '21'])
        const wrap = mount(
          {
            template: `
              <div>
              <span id='current'>{{ currentOrganisation }}</span>
              <button v-for='item in organisations' :key='item.organizationId'
                      @click='()=>setOrganisation(item.organizationId)'>{{ item.organizationId }}
              </button>
              </div>`,
            setup() {
              const { currentOrganisation, setOrganisation, organisations } =
                useOrganisation()
              return { currentOrganisation, setOrganisation, organisations }
            },
          },
          {
            parent: parent(),
          }
        )
        expectText(wrap.find('#current'), '11')
        const buttons = wrap.findAll('button')
        await buttons.at(0).trigger('click')
        expectText(wrap.find('#current'), '11')
      })
      it('set current if not the same organisation', async () => {
        jest.clearAllMocks()
        useUserinfo.mockResult(true, ['11', '21'])
        const wrap = mount(
          {
            template: `
              <div>
              <span id='current'>{{ currentOrganisation }}</span>
              <button v-for='item in organisations' :key='item.organizationId'
                      @click='()=>setOrganisation(item.organizationId)'>{{ item.organizationId }}
              </button>
              </div>`,
            setup() {
              const { currentOrganisation, setOrganisation, organisations } =
                useOrganisation()
              return { currentOrganisation, setOrganisation, organisations }
            },
          },
          {
            parent: parent(),
          }
        )
        expectText(wrap.find('#current'), '11')
        const buttons = wrap.findAll('button')
        await buttons.at(1).trigger('click')
        expectText(wrap.find('#current'), '21')
      })

      it('will assessments  status', async () => {
        const wrap = mount(
          {
            template: ` 
            <div  >
            <button
            @click='()=>getOrganisationStatus(assessmentList) '> </button>
            </div>
          
            `,
            setup() {
              const { getOrganisationStatus } = useOrganisation()

              return {
                assessmentList: renderAssessment(1),
                getOrganisationStatus,
              }
            },
          },
          {
            parent: parent(),
          }
        )
        const buttons = wrap.findAll('button')
        await buttons.at(0).trigger('click')
        await wrap.vm.$nextTick()
        expect(wrap).toBeTruthy()
      })

      it('clear current if not set organisation', async () => {
        jest.clearAllMocks()
        useUserinfo.mockResult(true, ['11', '21'])
        const wrap = mount(
          {
            template: `
              <div>
              <span id='current'>{{ currentOrganisation }}</span>
              <button id='clear' @click='()=>setOrganisation()'></button>
              </div>`,
            setup() {
              const { currentOrganisation, setOrganisation } = useOrganisation()
              return { currentOrganisation, setOrganisation }
            },
          },
          {
            parent: parent(),
          }
        )
        expectText(wrap.find('#current'), '11')
        const buttons = wrap.findAll('button')
        await buttons.at(0).trigger('click')
        expectText(wrap.find('#current'), '')
      })
    })
    it('can close onboarding', async () => {
      jest.clearAllMocks()
      useUserinfo.mockResult(true, ['11', '21'])
      const wrap = mount(
        {
          template: `
            <div @click="finishOnboarding(boarding)">
            <span id='assessments'>{{ showAssessmentsOnboarding }}</span>
            <span id='profile'>{{ showProfileOnboarding }}</span>
            </div>`,
          setup() {
            const {
              showAssessmentsOnboarding,
              showProfileOnboarding,
              finishOnboarding,
            } = useOrganisation()
            const boarding = ref('profile')
            return {
              showAssessmentsOnboarding,
              showProfileOnboarding,
              finishOnboarding,
              boarding,
            }
          },
        },
        {
          parent: parent(),
        }
      )
      await wrap.trigger('click')
      expectText(wrap.find('#profile'), 'false')
      expectText(wrap.find('#assessments'), 'true')
      await wrap.setData({ boarding: 'assessments' })
      await wrap.trigger('click')
      expectText(wrap.find('#assessments'), 'false')
    })
  })
})
