import { mount, shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useOrganisationMock } from '../helper/mockInject'
import CollapseCard from '~/components/organisms/CollapseCard.vue'
import CollapseCardItem from '~/components/molecules/CollapseCardItem.vue'

const collapse = {
  template: `<CollapseCard v-model="activeNames">
  <CollapseCardItem><div>test1</div></CollapseCardItem>
  <CollapseCardItem disabled><div>test2</div></CollapseCardItem>
  </CollapseCard>`,
  components: {
    CollapseCard,
    CollapseCardItem,
  },
  setup() {
    const activeNames = ref([])
    return {
      activeNames,
    }
  },
}


const useOrganisation = useOrganisationMock()
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))


describe('CollapseCard.vue', () => {
  it('can work', () => {
    const wrapper = mount(CollapseCard)
    expect(wrapper).toBeTruthy()
  })
  it('can slot', () => {
    const wrapper = shallowMount(CollapseCard, {
      components: {
        CollapseCardItem,
      },
      slots: {
        default: `<CollapseCardItem><div>test1</div></CollapseCardItem>
        <CollapseCardItem disabled><div>test2</div></CollapseCardItem>`,
      },
    })
    expect(wrapper.findAllComponents(CollapseCardItem).length).toBe(2)
  })

  it('can collapse toggle when click', async () => {
    const wrapper = mount(collapse)
    const item = wrapper.findAllComponents(CollapseCardItem).at(0)
    expect(item.vm.$data.expand).toBeFalsy()
    await item.find('button').trigger('click')
    expect(item.vm.$data.expand).toBeTruthy()
    await item.find('button').trigger('click')
    expect(item.vm.$data.expand).toBeFalsy()
  })
})
