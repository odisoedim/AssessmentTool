<template>
  <div>
    <ce-button theme="tertiary" @click="open">Save and resume later</ce-button>
    <ce-modal-with-content v-model="visible" height="230">
      <template #default>
        <ce-heading3 class="mb-2.5 pb-4">
          Your responses have been saved.
        </ce-heading3>
        <ce-p>
          Are you sure you want to exit this survey? You will return to the
          assessment overview.
        </ce-p>
      </template>
      <template #leftBtn>
        <ce-button theme="secondary" @click="close">Continue survey</ce-button>
      </template>
      <template #rightBtn>
        <ce-button :to="href" root-type="nuxt-link"> Exit </ce-button>
      </template>
    </ce-modal-with-content>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useBoolean } from '~/composables'
import CeButton from '~/components/atoms/CeButton.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeModalWithContent from '~/components/molecules/CeModalWithContent.vue'
import { useSurveyIds } from '~/pages-helper/assessment/survey/surveyIds'
import { useSurveyStore } from '~/pages-helper/assessment/survey/surveyStore'

export default defineComponent({
  name: 'SurveyExit',
  components: { CeModalWithContent, CeP, CeHeading3, CeButton },
  props: {
    fromDemo: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { bool: visible, open, close } = useBoolean()
    const { assessmentId } = useSurveyIds()
    const { save } = useSurveyStore()
    const href = computed(() => {
      return props.fromDemo
        ? `/demoAssessment/result/${assessmentId.value}`
        : `/assessment/overview/${assessmentId.value}`
    })
    return {
      visible,
      open: () => {
        save(false, false)
        open()
      },
      href,
      close,
    }
  },
})
</script>
