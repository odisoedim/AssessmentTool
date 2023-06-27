import { shallowMount, mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useOrganisationMock } from '../helper/mockInject'
import CeCollapseIconLink from '~/components/atoms/CeCollapseIconLink.vue'
import CeIcon from '~/components/atoms/CeIcon.vue'
import CeButton from '~/components/atoms/CeButton.vue'


const useOrganisation = useOrganisationMock()
 
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))
 
describe('CeCollapseIconLink.vue', () => {
  
  it('can work', () => {
    const wrapper = shallowMount(CeCollapseIconLink)
    expect(wrapper).toBeTruthy()
  })

  it('render icon', () => {
    const wrapper = shallowMount(CeCollapseIconLink)
    const icon =  wrapper.findComponent(CeIcon)
    expect(icon).toBeTruthy()
  })

  it('render button and click', async () => {

    const wrapper = shallowMount(CeCollapseIconLink)
    const button =  wrapper.findComponent(CeButton)
    await button.trigger('click')
    expect(button).toBeTruthy()
  })
  it('can toggle', async () => {
    const handleSetOrganisation = jest.fn()
    const wrapper = mount({
      template: `<CeCollapseIconLink v-model="expand">
      <CeButton @click="handleSetOrganisation()"> </CeButton>
      <div>test</div>
      </CeCollapseIconLink>`,
      components: {
        CeCollapseIconLink,
      },
      setup() {
        return {
          handleSetOrganisation,
          expand: ref(false),
        }
      },
    })
    const collapse = wrapper.findComponent(CeCollapseIconLink)
    const CeBtn = wrapper.findComponent(CeButton)
    await CeBtn.trigger('click')
    await collapse.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.expand).toBeTruthy()
  })
})
