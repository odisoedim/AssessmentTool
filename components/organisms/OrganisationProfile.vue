<template>
  <div class="relative">
    <OrganisationIntroCard
      v-if="onboard"
      class="absolute left-[43%] top-[-115px]"
      title="Hooray!"
      sub-title="Go to assessments."
      content="Your organisation has successfully been added to Circularity Assessment Tool. Go to your assessments to get started."
      position="top"
    />
    <ce-heading1>My organisation</ce-heading1>
    <ce-heading2 class="mt-22">Profile</ce-heading2>
    <div class="my-14">
      <div class="mb-10">
        <ce-small-text class="mb-2">Organisation name</ce-small-text>
        <ce-heading5>{{ profileShowData.organizationName || '' }}</ce-heading5>
      </div>
      <div class="mb-10">
        <ce-small-text class="mb-2">Established</ce-small-text>
        <ce-heading5>{{ profileShowData.foundedYear || '' }}</ce-heading5>
      </div>
      <div class="mb-10">
        <ce-small-text class="mb-2">Description</ce-small-text>
        <ce-heading5>{{ profileShowData.companyDescribe || '' }}</ce-heading5>
      </div>
      <div class="mb-10">
        <ce-small-text class="mb-2">Sector > Industry</ce-small-text>
        <ce-heading5
          >{{ profileShowData.sector }}
          {{
            profileShowData.industry ? ' > ' + profileShowData.industry : ''
          }}</ce-heading5
        >
      </div>
      <div class="mb-10">
        <ce-small-text class="mb-2">Annual turnover (EUR)</ce-small-text>
        <ce-heading5>{{ profileShowData.annualTurnover || '' }}</ce-heading5>
      </div>
      <div class="mb-10">
        <ce-small-text class="mb-2">Number of employees</ce-small-text>
        <ce-heading5>{{ profileShowData.employeesNumber || '' }}</ce-heading5>
      </div>
    </div>
    <ce-button @click="edit">Edit profile</ce-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeHeading2 from '~/components/atoms/CeHeading2.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import { useInjectProfileData } from '~/pages-helper/organisation/useOrganisationProfile'
import { useInjectEditBoolean } from '~/pages-helper/organisation/useEditBoolean'
import OrganisationIntroCard from '~/components/molecules/OrganisationIntroCard.vue'
export default defineComponent({
  name: 'OrganisationProfile',
  components: {
    OrganisationIntroCard,
    CeHeading1,
    CeHeading2,
    CeHeading5,
    CeSmallText,
    CeButton,
  },
  props: {
    onboard: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { open } = useInjectEditBoolean()
    const { profileShowData } = useInjectProfileData()
    const edit = () => {
      open && open()
    }
    return {
      edit,
      profileShowData,
    }
  },
})
</script>
