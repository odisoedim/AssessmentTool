<template>
  <div class="p-8 bg-kh-blue-grey-200 w-[594px] min-h-[1090px] rounded">
    <ce-button
      root-type="nuxt-link"
      :to="`/assessment/survey/${id}_${itemId}`"
      class="border border-blue-500"
    >
      Start Survey
    </ce-button>
    <p class="mt-14">Information about this element. id:{{ itemId }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useParamsId } from '@use/useParamsId'
import CeButton from '~/components/atoms/CeButton.vue'

export default defineComponent({
  name: 'SurveyPanel',
  components: {
    CeButton,
  },
  props: {
    itemId: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return {
      id: useParamsId(),
    }
  },
})
</script>
