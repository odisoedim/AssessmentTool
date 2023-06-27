import { mount } from '@vue/test-utils'
import {  ref,  } from '@nuxtjs/composition-api'
import { useOrganisationMock } from '../helper/mockInject'
import CollapseCard from '~/components/organisms/CollapseCard.vue'
import CollapseCardItem from '~/components/molecules/CollapseCardItem.vue'
import HeaderUserButton from '~/components/molecules/HeaderUserButton.vue'
const useOrganisation = useOrganisationMock()
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))

const collapse = {
  template: `<CollapseCard v-model="activeNames">
  <CollapseCardItem :assessments="assessments" :title="orgName"
  :item-name="orgName"
  :org-id="orgId"
  :org-img="orgImg"
  :score="score"
  :progress="progress"
  :completed="completed"
  :item-id="id" ><div>test1</div></CollapseCardItem>
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
      orgName: 'Bazaks',
      orgId: 7072,
      score: 5,
      completed: false,
      progress: 14,
    }
  },
}
describe('CollapseCardItem.vue', () => {
  it('can work', () => {
    const wrapper = mount(collapse)
    const HeaderUser = wrapper.findAllComponents(HeaderUserButton)
    expect(HeaderUser).toBeTruthy()
    expect(wrapper).toBeTruthy()
  })
})
