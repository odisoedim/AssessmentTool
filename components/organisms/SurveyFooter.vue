<template>
  <div class="flex justify-between px-16.5 my-24">
    <div>
      <survey-footer-back />
    </div>
    <div class="flex">
      <survey-exit class="mr-6" :from-demo="fromDemo" />
      <survey-footer-next v-if="!fromDemo" />
      <demo-survey-footer-next v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SurveyFooterBack from '~/components/molecules/SurveyFooterBack.vue'
import SurveyExit from '~/components/organisms/SurveyExit.vue'
import SurveyFooterNext from '~/components/molecules/SurveyFooterNext.vue'
import DemoSurveyFooterNext from '~/components/molecules/DemoSurveyFooterNext.vue'

export default defineComponent({
  name: 'SurveyFooter',
  components: {
    SurveyFooterNext,
    SurveyExit,
    SurveyFooterBack,
    DemoSurveyFooterNext,
  },
  props: {
    fromDemo: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
