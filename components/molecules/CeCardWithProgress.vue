<template>
  <div class="flex h-30 justify-between rounded-lg">
    <slot name="left" />

    <div class="flex">
      <CeCollapseIconLink
        v-if="isLink"
        v-model="singleExpand"
        title="Visit organisation"
        class="flex flex-col relative w-[265px] top-[40px]"
        :org-id="orgId"
      >
        <div class="flex flex-col">
          <ce-button
            theme="tertiary"
            custom-color
            :stroke-width="0"
            without-padding
            right-icon="users-group"
            class="text-kh-grey !text-base !font-normal mb-[18px]"
            root-type="nuxt-link"
            :to="LINK_ORG_PROFILE"
            >Organisation profile</ce-button
          >
          <ce-button
            theme="tertiary"
            custom-color
            :stroke-width="0"
            without-padding
            right-icon="logo-icon"
            class="text-kh-grey !text-base !font-normal"
            root-type="a"
            rel="noopener norefferrer"
            target="_blank"
            :href="`${LINK_READ_ORG_ACCOUNT}/${orgId}`"
            >Manage team</ce-button
          >
        </div>
      </CeCollapseIconLink>

      <div
        class="w-[167px] flex justify-center items-center bg-kh-blue-grey-100"
      >
        <span
          v-if="notApplicable"
          class="text-[36px] text-NotoSans text-kh-blue-grey-400 font-bold"
          >N/A</span
        >

        <SurveyScoreCircle
          v-else-if="score >= 0 && completed"
          :score="score"
          small-text
          diam="104"
          stroke-width="8"
          bar-background-color="grey"
        />
        <SurveyProgressLine
          v-else
          :progress="progress"
          small-text
          bar-background-color="grey"
          class="w-30"
        />
      </div>
    </div>
    <slot name="right" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

// components
import SurveyProgressLine from '~/components/molecules/SurveyProgressLine.vue'
import SurveyScoreCircle from '~/components/molecules/SurveyScoreCircle.vue'
import CeCollapseIconLink from '~/components/atoms/CeCollapseIconLink.vue'
import CeButton from '~/components/atoms/CeButton.vue'
// const
import { LINK_READ_ORG_ACCOUNT, LINK_ORG_PROFILE } from '~/constants/route'

export default defineComponent({
  name: 'CeCardWithProgress',
  components: {
    SurveyProgressLine,
    SurveyScoreCircle,
    CeCollapseIconLink,
    CeButton,
  },
  props: {
    notApplicable: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    score: {
      type: Number,
      default: -1,
    },
    progress: {
      type: Number,
      default: -1,
    },
    isLink: {
      type: Boolean,
      default: false,
    },
    orgId: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    return {
      singleExpand: ref(false),
      LINK_READ_ORG_ACCOUNT,
      LINK_ORG_PROFILE,
    }
  },
})
</script>
