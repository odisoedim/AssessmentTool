import { shallowMount, mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import CeCollapseSimple from '~/components/atoms/CeCollapseSimple.vue'

describe('CeCollapseSimple.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(CeCollapseSimple)
    expect(wrapper).toBeTruthy()
  })
  it('can toggle', async () => {
    const wrapper = mount({
      template: `<CeCollapseSimple v-model="expand">
      <div>test</div>
      </CeCollapseSimple>`,
      components: {
        CeCollapseSimple,
      },
      setup() {
        return {
          expand: ref(false),
        }
      },
    })
    const collapse = wrapper.findComponent(CeCollapseSimple)
    await collapse.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.expand).toBeTruthy()
  })
})
