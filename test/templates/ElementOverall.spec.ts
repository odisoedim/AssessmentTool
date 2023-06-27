import { mount, shallowMount } from '@vue/test-utils'

import CeItem from '~/components/molecules/CeItem.vue'
import ElementOverall from '~/components/templates/ElementOverall.vue'
import { FrameworkElement } from '~/type/frameworkElement'
import SurveyPanel from '~/components/organisms/SurveyPanel.vue'

const itemList: FrameworkElement[] = [
  {
    id: 1,
    name: 'test1',
    description: 'string',
    children: [],
    framework: {
      name: 'string',
      id: '11',
      description: 'string',
      short_description: 'string',
    },
    substrategy_questions: [],
  },
  {
    id: 2,
    name: 'test2',
    description: 'string',
    children: [],
    framework: {
      name: 'string',
      id: '21',
      description: 'string',
      short_description: 'string',
    },
    substrategy_questions: [],
  },
]
describe('ElementOverall.vue', () => {
  it('can work', () => {
    const wrapper = mount(ElementOverall, {
      propsData: {
        itemList,
      },
    })
    expect(wrapper).toBeTruthy()
  })
  it('has correct structure', () => {
    const wrapper = shallowMount(ElementOverall, {
      propsData: {
        itemList,
      },
    })

    const ceItemList = wrapper.findAllComponents(CeItem)
    expect(ceItemList.length).toBe(2)

    const panel = wrapper.findComponent(SurveyPanel)
    expect(panel).toBeTruthy()
  })
  it('click correctly', async () => {
    const wrapper = shallowMount(ElementOverall, {
      propsData: {
        itemList,
      },
    })
    await wrapper.findAll('li.item-list').at(0).trigger('click')

    expect(wrapper.vm.$data.itemId).toBe(1)
    expect(wrapper.vm.$data.activeIndex).toBe(0)
    expect(
      wrapper.findAllComponents(CeItem).at(0).attributes('active')
    ).toBeTruthy()
  })
})
