<template>
  <div class="w-[1032px] mx-auto mb-96">
    <div class="mt-[62.5px] mb-[49.5px]">
      <ce-breadcrumb :paths="paths"></ce-breadcrumb>
    </div>
    <ce-heading1 class="mt-[61px] mb-20">My assessments</ce-heading1>

    <assessment-card-group
      v-if="!error"
      :loading="loading"
      :assessments="assessments || []"
      :org-id="+orgId"
    />

    <div
      class="flex flex-col pb-[302px] pt-[100px] font-NotoSans text-base font-normal cursor-pointer"
    >
      <ce-button
        theme="tertiary"
        custom-color
        :stroke-width="0"
        :without-padding="true"
        left-icon="users-group"
        class="mb-4 text-kh-grey"
        root-type="nuxt-link"
        :to="LINK_ORG_PROFILE"
        >Manage this organisation’s profile</ce-button
      >

      <ce-button
        theme="tertiary"
        custom-color
        :stroke-width="0"
        :without-padding="true"
        left-icon="logo-icon"
        class="text-kh-grey"
        root-type="a"
        rel="noopener norefferrer"
        target="_blank"
        :href="`${LINK_READ_ORG_ACCOUNT}/${orgId}`"
        >Manage this organisation's team</ce-button
      >
    </div>

    <AssessmentsIntroductionModal v-if="showAssessmentsOnboarding" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

// hooks
import { useOrganisation } from '@use/useOrganisation'
import { useAssessments } from '~/pages-helper/assessment/index'

// components
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import AssessmentCardGroup from '~/components/organisms/AssessmentCardGroup.vue'
import AssessmentsIntroductionModal from '~/components/templates/AssessmentsIntroductionModal.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import CeBreadcrumb from '~/components/atoms/CeBreadcrumb.vue'
// type
import { BreadcrumbItem } from '~/type/base'

// utils
import { stringCut } from '~/util/stringCut'

// const
import { LINK_READ_ORG_ACCOUNT, LINK_ORG_PROFILE } from '~/constants/route'

export default defineComponent({
  name: 'AssessmentsPage',
  components: {
    CeHeading1,
    AssessmentCardGroup,
    AssessmentsIntroductionModal,
    CeButton,
    CeBreadcrumb,
  },
  setup() {
    const { error, assessments, loading } = useAssessments()
    const { showAssessmentsOnboarding, getOrganisation } = useOrganisation()

    const orgName = computed(
      () => getOrganisation.value?.organizationName || ''
    ).value
    const orgId = computed(
      () => getOrganisation.value?.organizationId || ''
    ).value

    const paths = computed<BreadcrumbItem[]>(() => {
      return [
        {
          nuxtLink: true,
          id: '1',
          title: 'Organisations',
          to: '/assessment/organisations',
        },
        {
          nuxtLink: false,
          id: '2',
          title: `${stringCut(orgName)} assessments`,
          to: `#`,
        },
      ]
    })
    return {
      loading,
      assessments,
      error,
      showAssessmentsOnboarding,
      paths,
      orgId,
      LINK_READ_ORG_ACCOUNT,
      LINK_ORG_PROFILE,
    }
  },
})
</script>
