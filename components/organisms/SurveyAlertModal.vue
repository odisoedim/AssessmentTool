<template>
  <ce-modal-with-content v-model="visible" height="200">
    <template #default>
      <ce-heading3 class="mb-2.5 pb-4"
        >One or more questions have not been completed.
      </ce-heading3>
      <ce-p
        >You cannot proceed until you have responded to all the questions.</ce-p
      >
    </template>
    <template #rightBtn>
      <ce-button theme="tertiary" @click="close">Got it</ce-button>
    </template>
  </ce-modal-with-content>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useModel } from '@use/useModel'
import { useBooleanWrap } from '~/composables'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import CeModalWithContent from '~/components/molecules/CeModalWithContent.vue'

export default defineComponent({
  name: 'SurveyAlertModal',
  components: { CeModalWithContent, CeButton, CeP, CeHeading3 },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const { bool: visible, close } = useBooleanWrap(
      useModel(
        () => props.value,
        (v) => emit('input', v)
      )
    )
    return { visible, close }
  },
})
</script>
