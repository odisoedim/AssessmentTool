<template>
  <div class="w-[1032px] mx-auto pb-[33.25px] px-4 box-content">
    <div class="mt-[62.5px] mb-[49.5px]">
      <ce-breadcrumb :paths="paths"></ce-breadcrumb>
    </div>
    <organisation-profile v-if="!edit" :onboard="guideCard" />
    <organisation-profile-edit v-else :onboard="guideCard" />
    <OrganisationBoardingModal v-if="showModal" />
    <OrganisationIntroductionModal v-if="showProfileOnboarding" />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  watchEffect,
} from '@nuxtjs/composition-api'

// hooks
import { useOrganisation } from '@use/useOrganisation'
import { useUserinfo } from '@use/useUserinfo'
import { useBoolean } from '~/composables'
import {
  useSelectOptions,
  useInjectOptions,
} from '~/pages-helper/organisation/useSelectOptions'
import { useOrganisationProfile } from '~/pages-helper/organisation/useOrganisationProfile'
import {
  useProvideEditBoolean,
  useInjectEditBoolean,
} from '~/pages-helper/organisation/useEditBoolean'

// components
import OrganisationProfile from '~/components/organisms/OrganisationProfile.vue'
import OrganisationProfileEdit from '~/components/organisms/OrganisationProfileEdit.vue'
import OrganisationIntroductionModal from '~/components/templates/OrganisationIntroductionModal.vue'
import OrganisationBoardingModal from '~/components/organisms/OrganisationBoardingModal.vue'
import CeBreadcrumb from '~/components/atoms/CeBreadcrumb.vue'

// type
import { BreadcrumbItem } from '~/type/base'

// utils
import { stringCut } from '~/util/stringCut'

export default defineComponent({
  name: 'Organisation',
  components: {
    OrganisationBoardingModal,
    OrganisationProfile,
    OrganisationProfileEdit,
    OrganisationIntroductionModal,
    CeBreadcrumb,
  },
  setup() {
    useSelectOptions()
    const options = useInjectOptions()
    useOrganisationProfile(options)
    useProvideEditBoolean()
    const { result } = useUserinfo()
    const { getOrganisation, organisations, showProfileOnboarding } =
      useOrganisation()
    const { bool: showModal, open: openModal } = useBoolean(false)
    onMounted(() => {
      if (result.value) {
        if (!organisations.value.length) openModal()
      }
    })
    const { bool: edit, open } = useInjectEditBoolean()
    watchEffect(
      () => (showModal.value || showProfileOnboarding.value) && open && open()
    )
    const { bool: guideCard, open: showGuideCard } = useBoolean(false)
    watchEffect(() => showProfileOnboarding.value && showGuideCard())

    const orgName = computed(
      () => getOrganisation.value?.organizationName || ''
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
          nuxtLink: true,
          id: '2',
          title: `${stringCut(orgName)} assessments`,
          to: `/assessment/`,
        },
        {
          nuxtLink: false,
          id: '3',
          title: `Profile`,
          to: `#`,
        },
      ]
    })
    return {
      showProfileOnboarding,
      edit,
      showModal,
      guideCard,
      paths,
    }
  },
})
</script>
