import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import QuestionResult from '~/components/molecules/QuestionResult.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'

jest.mock('~/pages-helper/assessment/survey/subStrategyOption', () => ({
  useSubStrategyOption: () =>
    ref([
      'Currently no development',
      'Currently exploring',
      'Currently piloting',
      'Partially operational',
      'Fully operational',
      'Not applicable',
    ]),
}))
describe('QuestionResult', () => {
  it('can work', () => {
    const wrap = shallowMount(QuestionResult, {
      propsData: {
        subStrategy: '',
        subStrategyId: 2,
        frameworkId: 3,
        option: 1,
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('render title and link when option eq 0', () => {
    const wrap = shallowMount(QuestionResult, {
      propsData: {
        subStrategy: '',
        subStrategyId: 2,
        frameworkId: 3,
        option: 0,
      },
    })
    const ceHeading5 = wrap.findAllComponents(CeHeading5)
    expect(ceHeading5.wrappers[1]).toBeTruthy()
    expect(ceHeading5.wrappers[1].text()).toBe('Need help getting started?')
    const link = wrap.find('a')
    expect(link.attributes('href')).toBe(
      `https://knowledge-hub.circle-lab.com/frameworks/${3}/${2}?curator=Approved`
    )
  })
  it('render title and link when option eq 1', () => {
    const wrap = shallowMount(QuestionResult, {
      propsData: {
        subStrategy: '',
        subStrategyId: 1,
        frameworkId: 1,
        option: 1,
      },
    })
    const ceHeading4 = wrap.findAllComponents(CeHeading5)
    expect(ceHeading4.wrappers[1]).toBeTruthy()
    expect(ceHeading4.wrappers[1].text()).toBe('Keep exploring!')
    const link = wrap.findAll('a')
    expect(link.wrappers[0].attributes('href')).toBe(
      'https://www.circle-economy.com/'
    )
    expect(link.wrappers[1].attributes('href')).toBe(
      `https://knowledge-hub.circle-lab.com/frameworks/${1}/${1}?curator=Approved`
    )
  })
  it('render title and link when option eq 2', () => {
    const wrap = shallowMount(QuestionResult, {
      propsData: {
        subStrategy: '',
        subStrategyId: 2,
        frameworkId: 2,
        option: 2,
      },
    })
    const ceHeading4 = wrap.findAllComponents(CeHeading5)
    expect(ceHeading4.wrappers[1]).toBeTruthy()
    expect(ceHeading4.wrappers[1].text()).toBe("You're on your way!")
    const link = wrap.find('a')
    expect(link.attributes('href')).toBe(
      `https://knowledge-hub.circle-lab.com/frameworks/${2}/${2}?curator=Approved`
    )
  })
  it('render title and link when option eq 3', () => {
    const wrap = shallowMount(QuestionResult, {
      propsData: {
        subStrategy: '',
        subStrategyId: 3,
        frameworkId: 3,
        option: 3,
      },
    })
    const ceHeading4 = wrap.findAllComponents(CeHeading5)
    expect(ceHeading4.wrappers[1]).toBeTruthy()
    expect(ceHeading4.wrappers[1].text()).toBe('Almost there!')
    const link = wrap.findAll('a')
    expect(link.wrappers[0].attributes('href')).toBe(
      'https://www.circle-economy.com/contact'
    )
    expect(link.wrappers[1].attributes('href')).toBe(
      `https://knowledge-hub.circle-lab.com/frameworks/${3}/${3}?curator=Approved`
    )
  })
  it('render title and link when option eq 4', () => {
    const wrap = shallowMount(QuestionResult, {
      propsData: {
        subStrategy: '',
        subStrategyId: 4,
        frameworkId: 4,
        option: 4,
      },
    })
    const ceHeading4 = wrap.findAllComponents(CeHeading5)
    expect(ceHeading4.wrappers[1]).toBeTruthy()
    expect(ceHeading4.wrappers[1].text()).toBe('Keep up the good work!')
    const link = wrap.find('a')
    expect(link.attributes('href')).toBe(
      'https://knowledge-hub.circle-lab.com/'
    )
  })
  it('render title when option eq 5', () => {
    const wrap = shallowMount(QuestionResult, {
      propsData: {
        subStrategy: '',
        subStrategyId: 2,
        frameworkId: 3,
        option: 5,
      },
    })
    expect(wrap.findAll('.bg-kh-blue-grey-300').length).toBe(0)
  })
})
