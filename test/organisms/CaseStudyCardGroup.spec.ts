import { mount, shallowMount } from '@vue/test-utils'
import CaseStudyCardGroup from '~/components/organisms/CaseStudyCardGroup.vue'
import CaseStudyCard from '~/components/molecules/CaseStudyCard.vue'
import CeSkeleton from '~/components/atoms/CeSkeleton.vue'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import CaseStudyModal from '~/components/organisms/CaseStudyModal.vue'
import { renderArticle } from '~/test/helper/mockData'

describe('CaseStudyCardGroup.vue', () => {
  it('can work', () => {
    const wrap = mount(CaseStudyCardGroup)
    expect(wrap).toBeTruthy()
  })
  it('will show ske if loading', () => {
    const wrap = mount(CaseStudyCardGroup, {
      propsData: {
        caseList: [],
        loading: true,
      },
    })
    const skeleton = wrap.findComponent(CeSkeleton)
    const text = wrap.findComponent(CeHeading4)
    const image = wrap.findComponent(CeImage)
    expect(skeleton.exists()).toBe(true)
    expect(text.exists()).toBe(false)
    expect(image.exists()).toBe(false)
  })
  it('renders CaseStudyCards', () => {
    const wrap = mount(CaseStudyCardGroup, {
      propsData: {
        caseList: renderArticle([1, 2, 3]),
      },
    })
    const card = wrap.findAllComponents(CaseStudyCard)
    expect(card.exists()).toBe(true)
    expect(card.length).toBe(3)
  })
  describe('has a modal', () => {
    it('does not have a modal during loading', () => {
      const wrap = shallowMount(CaseStudyCardGroup, {
        propsData: {
          caseList: renderArticle([1, 2, 3]),
          loading: true,
        },
      })
      const modal = wrap.findComponent(CaseStudyModal)
      expect(modal.exists()).toBe(false)
    })
    it('has a modal after loading', async () => {
      const wrap = shallowMount(CaseStudyCardGroup, {
        propsData: {
          caseList: renderArticle([1, 2, 3]),
          loading: true,
        },
      })
      let modal = wrap.findComponent(CaseStudyModal)
      expect(modal.exists()).toBe(false)
      await wrap.setProps({ loading: false })
      modal = wrap.findComponent(CaseStudyModal)
      expect(modal.exists()).toBe(true)
    })
    it('will set caseData for modal after click card', async () => {
      const wrap = shallowMount(CaseStudyCardGroup, {
        propsData: {
          caseList: renderArticle([1, 2, 3]),
          loading: false,
        },
      })
      const card = wrap.findComponent(CaseStudyCard)
      const modal = wrap.findComponent(CaseStudyModal)
      expect(modal.vm.$props.value).toBe(false)
      await card.trigger('click')
      expect(wrap.vm.$data.activeIndex).toBe(0)
      expect(modal.vm.$props.value).toBe(true)
    })
  })
})
