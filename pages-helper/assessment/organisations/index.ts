import { computed, onBeforeMount, ref, watch } from '@nuxtjs/composition-api'
import { firstBy } from 'thenby'
import { useOrganisation } from '~/composables/useOrganisation'

import { useAssessments } from '~/pages-helper/assessment/index'
export const sortOrgOverview = (array: any) =>
  array.sort(
    firstBy('progress', 'desc').thenBy('score', 'desc').thenBy('orgName')
  )
export const useOrgAssessments = () => {
  const { organisations, getOrganisationStatus } = useOrganisation()

  let allAssessments = ref([]) as any
  onBeforeMount(() => {
    for (const item of organisations.value) {
      const { organizationId } = item

      const { assessments } = useAssessments(organizationId)

      watch(
        assessments,
        (assessment) => {
          allAssessments.value.push({
            orgId: item.organizationId,
            orgName: item.organizationName,
            orgImg: item.organizationPhotoPath,
            orgAssessments: assessments,
            ...getOrganisationStatus(assessment),
          })
        },
        { deep: true }
      )
    }
  })

  return computed(() => allAssessments.value).value
}
