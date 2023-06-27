import { mount, shallowMount } from '@vue/test-utils'
import AssessmentCardImage from '~/components/atoms/AssessmentCardImage.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import CeSkeleton from '~/components/atoms/CeSkeleton.vue'

describe('AssessmentCardImage.vue', () => {
  it('can work', () => {
    const wrap = shallowMount(AssessmentCardImage)
    expect(wrap).toBeTruthy()
  })
  describe('loading', () => {
    it('show image', () => {
      const wrap = mount(AssessmentCardImage)
      const logo = wrap.findComponent(CeImage)
      expect(logo).toBeTruthy()
      expect(logo.vm.$props.src).toBeFalsy()
    })
  })

  it('show skeleton if not loading ', () => {
    const wrap = mount(AssessmentCardImage, {
      propsData: {
        loading: true,
      },
    })
    const ceSkeleton = wrap.findComponent(CeSkeleton)
    expect(ceSkeleton.exists()).toBeTruthy()
  })
})
