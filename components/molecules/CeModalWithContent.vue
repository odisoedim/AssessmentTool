<template>
  <ce-modal
    v-model="visible"
    :show-header="false"
    modal-class="top-[350px]"
    :height="height"
    :width="width"
  >
    <div class="p-6 relative h-full">
      <slot></slot>
      <div v-if="$slots.leftBtn" class="absolute bottom-6 left-6">
        <slot name="leftBtn"></slot>
      </div>
      <div v-if="$slots.rightBtn" class="absolute bottom-6 right-6">
        <slot name="rightBtn"></slot>
      </div>
    </div>
  </ce-modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useModel } from '@use/useModel'
import CeModal from '~/components/molecules/CeModal.vue'
import { useBooleanWrap } from '~/composables'

export default defineComponent({
  name: 'CeModalWithContent',
  components: { CeModal },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    width: {
      type: [String, Number],
      default: 700,
    },
    height: {
      type: [String, Number],
      default: 250,
    },
  },
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
