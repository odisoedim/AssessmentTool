import { mount, shallowMount } from '@vue/test-utils'
import AssessmentExpandCard from '~/components/molecules/AssessmentExpandCard.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import CeButton from '~/components/atoms/CeButton.vue'

describe('AssessmentExpandCard.vue', () => {
  it('can work', () => {
    const wrap = shallowMount(AssessmentExpandCard)
    expect(wrap).toBeTruthy()
  })

  it('show image', () => {
    const wrap = mount(AssessmentExpandCard)
    const logo = wrap.findComponent(CeImage)
    expect(logo).toBeTruthy()
    expect(logo.vm.$props.src).toBeTruthy()
  })
  it('show button', () => {
    const wrap = mount(AssessmentExpandCard)
    const button = wrap.findComponent(CeButton)
    expect(button).toBeTruthy()
  })
})
