<template>
  <ce-tabs class="mt-16 w-[900px]" title="Assessment">
    <div class="-mb-8 px-16.5 pt-20 pb-16">
      <template v-for="item in frameworkCardsData">
        <CeCardWithProgress
          :key="item.id"
          :score="item.score"
          :progress="item.progress"
          :completed="item.completed"
          :not-applicable="item.notApplicable"
          class="mb-8 cursor-pointer hover:shadow-normal-hover"
          :class="
            item.progress < 0 || item.score >= 0
              ? 'shadow-card'
              : 'shadow-normal'
          "
          @click.native="redirectToStrategy(item.id)"
        >
          <template #right>
            <div class="flex flex-auto items-center ml-11.5">
              <div class="w-[351px] mr-10">
                <ce-heading4 class="truncate-2">{{ item.name }}</ce-heading4>
                <ce-button
                  v-if="item.score < 0 || !item.completed"
                  theme="tertiary"
                  root-type="nuxt-link"
                  :to="`/assessment/result/${id}_${item.id}#more`"
                  class="-ml-4"
                  @click.native="stop"
                  >Learn more</ce-button
                >
              </div>
              <SurveyCardButton
                :item-id="item.id"
                :score="item.score"
                :progress="item.progress"
                :completed="item.completed"
                @click.native="stop"
              />
            </div>
          </template>
        </CeCardWithProgress>
      </template>
    </div>
  </ce-tabs>
</template>
<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { useParamsId } from '@use/useParamsId'
import { useAssessmentCardResult } from '~/pages-helper/assessment/overview/assesmentCardResult'
import CeTabs from '~/components/atoms/CeTabs.vue'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import SurveyCardButton from '~/components/atoms/SurveyCardButton.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import CeCardWithProgress from '~/components/molecules/CeCardWithProgress.vue'

export default defineComponent({
  name: 'AssessmentSurveyTabs',
  components: {
    CeTabs,
    CeCardWithProgress,
    CeHeading4,
    CeButton,
    SurveyCardButton,
  },
  setup() {
    const id = useParamsId()
    const frameworkCardsData = useAssessmentCardResult()
    const router = useRouter()
    const redirectToStrategy = (itemId: string | number) => {
      router.push(`/assessment/result/${id.value}_${itemId}`)
    }
    const stop = (event: any) => {
      event.stopPropagation()
    }
    return {
      redirectToStrategy,
      stop,
      id,
      frameworkCardsData,
    }
  },
})
</script>
