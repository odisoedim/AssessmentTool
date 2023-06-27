import { mount } from '@vue/test-utils'
import AssessmentCardText from '~/components/atoms/AssessmentCardText.vue'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeSkeleton from '~/components/atoms/CeSkeleton.vue'
 
 
describe('AssessmentCardText.vue', () => {
  it('can work', () => {
   
    const wrap = mount(AssessmentCardText, {
      propsData: {
        cardTitle: 'test cardTitle',
        keyElement: 'test keyElement',
        frozenBy: 'odiso',
        lastEdited:'Wed, Mar 02 2022 at 04:34',
        profileImg: 'test profileImg'
 
      },
    })
    expect(wrap).toBeTruthy()
  })
  describe('loading', () => {
    it('show assessment text', () => {
      const wrap = mount(AssessmentCardText, {
        propsData: {
          loading: false,
          cardTitle: 'test cardTitle',
          keyElement: 'test keyElement',
          frozenBy: 'odiso',
          lastEdited:'Wed, Mar 02 2022 at 04:34',
          profileImg: 'test profileImg'
   
        },
      })
      const h4 = wrap.findComponent(CeHeading4)
      const ceP = wrap.findComponent(CeP)
      expect(h4).toBeTruthy()
      expect(h4.classes('truncate-2')).toBe(true)
      expect(ceP).toBeTruthy() 
    })
  })
  describe('loading', () => {
    it('show skeleton if not loading ', () => {
      const wrap = mount(AssessmentCardText, {
        propsData: {
          loading: true,
          cardTitle: 'test cardTitle',
          keyElement: 'test keyElement',
          frozenBy: 'odiso',
          lastEdited:'Wed, Mar 02 2022 at 04:34',
          profileImg: 'test profileImg'
   
        },
      })
      const ceSkeleton = wrap.findComponent(CeSkeleton)
      expect(ceSkeleton.exists()).toBeTruthy()
    })
  })
})
