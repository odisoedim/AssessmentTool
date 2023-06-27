<template>
  <div v-if="!loading">

      <div class="w-[1032px] mx-auto mb-96">
        <ce-heading1 class="mt-[61px] mb-20">Organisations</ce-heading1>

        <CollapseCard v-model="activeNames">
          <CollapseCardItem
            v-for="item in sortOrgOverview(allOrgAssessments.slice())"
            :key="item.id"
            :title="item.orgName"
            :score="item.score"
            :progress="item.progress"
            :completed="item.completed"
            :org-id="item.orgId"
            :org-img="item.orgImg"
          >
            <assessment-card-group
              v-if="!error"
              :org-id="item.orgId"
              :loading="loading"
              :assessments="item.orgAssessments.value || []"
          /></CollapseCardItem>
        </CollapseCard>
      </div>

  </div>
  <CeLoader v-else />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

// hooks
import { useAssessments } from '~/pages-helper/assessment/index'
import {
  useOrgAssessments,
  sortOrgOverview,
} from '~/pages-helper/assessment/organisations/index'
// component
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import AssessmentCardGroup from '~/components/organisms/AssessmentCardGroup.vue'
import CollapseCard from '~/components/organisms/CollapseCard.vue'
import CollapseCardItem from '~/components/molecules/CollapseCardItem.vue'
import CeLoader from '~/components/atoms/CeLoader.vue'

export default defineComponent({
  name: 'OrgAssessmentsPage',
  components: {
    CeHeading1,
    AssessmentCardGroup,
    CollapseCardItem,
    CollapseCard,
    CeLoader,
  },
  setup() {
    const { loading, error } = useAssessments()

    const activeNames = ref([])

    const allOrgAssessments = useOrgAssessments()

    return {
      activeNames,
      loading,
      error,
      allOrgAssessments,
      sortOrgOverview,
    }
  },
})
</script>
