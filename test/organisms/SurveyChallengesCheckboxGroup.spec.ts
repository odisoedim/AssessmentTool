import { mount } from '@vue/test-utils'
import {
  computed,
  defineComponent,
  provide,
  Ref,
  ref,
} from '@nuxtjs/composition-api'
import SurveyChallengesCheckboxGroup from '~/components/organisms/SurveyChallengesCheckboxGroup.vue'
import '../helper/svgIcon'
import { useBoolean } from '~/composables'
import CeInput from '~/components/atoms/CeInput.vue'
import { challengeOptionsSymbol } from '~/pages-helper/assessment/survey/challengeOptions'
import {
  computedPagesSymbol,
  useComputedPages,
} from '~/pages-helper/assessment/survey/computedPages'

export const provideChallengeOptionsMock = () => {
  const item = (id: string) => ({
    name: `mock_${id}`,
    id,
    description: `description-${id}`,
    children: null,
    framework: {
      name: 'framework',
      id: '266',
      description: 'string',
      short_description: 'string',
    },
    substrategy_questions: [],
  })
  provide(challengeOptionsSymbol, ref(['1', '2', '3'].map(item)))
}

export const provideComputedPagesMock = () => {
  const validation = useBoolean()
  provide(computedPagesSymbol, {
    validation,
    computedPages: ref([]),
    nextPage: jest.fn(),
    prevPage: () => false,
    ready: jest.fn(),
    pageIndex: ref(1),
    furthestPage: ref(1),
    pagesLength: ref(1),
    genPages: jest.fn(),
  })
}

const wrapComponent = (
  value: Ref<{ check: string[]; other: string }> = ref({ check: [], other: '' })
) =>
  defineComponent({
    components: { SurveyChallengesCheckboxGroup },
    setup() {
      provideChallengeOptionsMock()
      provideComputedPagesMock()
      const { validation } = useComputedPages()
      return { value, validation: computed(() => validation.bool.value) }
    },
    template: `<div><survey-challenges-checkbox-group v-model="value" /><div id='validation' >{{validation?1:0}}</div></div>`,
  })

describe('SurveyChallengesCheckboxGroup.vue', () => {
  it('can work', () => {
    const value = ref({ check: [], other: '' })
    const wrap = mount(wrapComponent(value))
    const surveyChallengesCheckboxGroup = wrap.findComponent(
      SurveyChallengesCheckboxGroup
    )
    surveyChallengesCheckboxGroup.vm.$emit('input', {
      check: ['mock_1'],
      other: 'other input',
    })
    expect(value.value.check).toContain('mock_1')
    expect(value.value.other).toBe('other input')
    expect(wrap).toBeTruthy()
  })

  it('will show a input when check option named "Other"', async () => {
    const value = ref({ check: [], other: '' })
    const wrap = mount(wrapComponent(value))
    const surveyChallengesCheckboxGroup = wrap.findComponent(
      SurveyChallengesCheckboxGroup
    )
    expect(surveyChallengesCheckboxGroup).toBeTruthy()
    let otherInput = wrap.findComponent(CeInput)
    expect(otherInput.exists()).toBeFalsy()
    surveyChallengesCheckboxGroup.setData({ valueCheck: ['Other'] })
    await surveyChallengesCheckboxGroup.vm.$nextTick()
    otherInput = wrap.findComponent(CeInput)
    expect(otherInput.isVisible()).toBe(true)
  })

  it('will lock the page if check option named "Other" and not type the input', async () => {
    const value = ref({ check: [], other: '' })
    const wrap = mount(wrapComponent(value))
    const surveyChallengesCheckboxGroup = wrap.findComponent(
      SurveyChallengesCheckboxGroup
    )
    await wrap.vm.$nextTick()
    const validation = wrap.get('#validation')
    expect(validation.text()).toBe('1')
    surveyChallengesCheckboxGroup.setData({ valueCheck: ['Other'] })
    await surveyChallengesCheckboxGroup.vm.$nextTick()
    await wrap.vm.$nextTick()
    expect(validation.text()).toBe('0')
    surveyChallengesCheckboxGroup.setData({
      valueInput: 'Tech',
    })
    await surveyChallengesCheckboxGroup.vm.$nextTick()
    await wrap.vm.$nextTick()
    expect(validation.text()).toBe('1')
  })
})
