import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useOrganisationMock } from '~/test/helper/mockInject'
import AssessmentCard from '~/components/molecules/AssessmentCard.vue'
import SurveyProgressLine from '~/components/molecules/SurveyProgressLine.vue'
import SurveyScoreCircle from '~/components/molecules/SurveyScoreCircle.vue'
import AssessmentCardImage from '~/components/atoms/AssessmentCardImage.vue'
import { AssessmentLevel } from '~/type/enum'


const useOrganisation = useOrganisationMock()
 
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))

 
useOrganisation.getOrganisation.mockReturnValue(
  ref({
    jobTitle: 'testing',
    organizationId: 1,
    organizationName: `1_name`,
  })
)

 
describe('AssessmentCard.vue', () => {
  
  it('can work', async () => {
    const wrap = shallowMount(AssessmentCard,{
      propsData: {
        loading: false,
        assessmentId: 1,
      },
    })
     
    await wrap.trigger('click') 
    expect(wrap).toBeTruthy()
  })
  it('loading', () => {
    const wrap = shallowMount(AssessmentCard,{
      propsData: {
        loading: true,
        assessmentId: 1,
      },
    })
    const surveyProgressLine = wrap.findComponent(SurveyProgressLine)
    expect(surveyProgressLine.vm).toBeFalsy()
  })
  it('0% progress', () => {
 
    const wrap = shallowMount(AssessmentCard,{
      propsData: {
        loading: false,
        assessmentId: 1,
        progress: 0,
      },
    })

    const surveyProgressLine = wrap.findComponent(SurveyProgressLine)
    const surveyScoreCircle = wrap.findComponent(SurveyScoreCircle)
    expect(surveyProgressLine.vm).toBeTruthy()
    expect(surveyScoreCircle.vm).toBeFalsy()
  })

  it('100% progress', () => {
    const wrap = shallowMount(AssessmentCard, {
      propsData: {
        loading: false,
        assessmentId: 1,
        progress: 100,
      },
    }) 
    const surveyScoreCircle = wrap.findComponent(SurveyScoreCircle)
    expect(surveyScoreCircle.vm).toBeTruthy()
  })

  it('90 score', () => {
    const wrap = shallowMount(AssessmentCard, {
      propsData: {
        loading: false,
        assessmentId: 1,
        progress: 100,
        score: 90,
      },
    })
    const surveyScoreCircle = wrap.findComponent(SurveyScoreCircle)
    expect(surveyScoreCircle.vm).toBeTruthy()
    expect(surveyScoreCircle.vm.$props.score).toBe(90)
  })

  it('should have an image', () => {
    const wrap = shallowMount(AssessmentCard, {
      propsData: {
        loading: false,
        assessmentId: 1,
        image: 'https://ast-cms-dev.circle-lab.com/uploads/Frame_8114_f843378a47.png'
      },
    })
    const assessmentCardImage = wrap.findComponent(AssessmentCardImage)
    
    expect(assessmentCardImage.vm).toBeTruthy()
    expect(assessmentCardImage.vm.$props.src).toBeTruthy()
    expect(assessmentCardImage.vm.$props.src).toBe('https://ast-cms-dev.circle-lab.com/uploads/Frame_8114_f843378a47.png')
  })


    it('should be clickable', async () => {
    const wrap = shallowMount(AssessmentCard, {
      propsData: {
        loading: false,
        assessmentId: 1,
        tier: AssessmentLevel.Tier1
      },
    })
    const firstDiv = wrap.findAll('div').at(0) 
   await firstDiv.trigger('click')
    expect(firstDiv.vm).toBeTruthy()
  
  })
 
})
