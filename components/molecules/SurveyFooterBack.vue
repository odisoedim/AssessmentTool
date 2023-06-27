<template>
  <ce-button v-show="pageIndex > -1" theme="secondary" @click="prevPage">
    Back
  </ce-button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeButton from '~/components/atoms/CeButton.vue'
import { useComputedPages } from '~/pages-helper/assessment/survey/computedPages'

export default defineComponent({
  name: 'SurveyFooterBack',
  components: { CeButton },
  setup() {
    const { prevPage, pageIndex } = useComputedPages()
    return { prevPage, pageIndex }
  },
})
</script>
