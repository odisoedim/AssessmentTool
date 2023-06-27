import { Ref } from '@nuxtjs/composition-api'
import { useRequestAsync } from '~/composables'
import { useFetchAssessment } from '~/api/assessment'
import { useFetchFrameworkElements } from '~/api/frameworkElements'

export const useAssessmentAsync = (id: Ref<string>) => {
  const fetchAssessment = useFetchAssessment()
  const fetchFramework = useFetchFrameworkElements()

  return useRequestAsync(`assessment_${id.value}`, async () => {
    const { data: assessmentData } = await fetchAssessment({ id: id.value })
    const framework_id = assessmentData!.assessment.framework_id
    const { data: frameworksData } = await fetchFramework({
      id: framework_id,
      isTop: true,
    })
    return {
      assessment: assessmentData?.assessment,
      frameworkElements: frameworksData?.frameworkElements,
    }
  })
}
