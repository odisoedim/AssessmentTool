<template>
  <div>
    <button class="inline-flex" @click="toggle">
      <ce-heading2 v-if="title" class="select-none">{{ title }}</ce-heading2>
      <ce-icon :name="value ? 'chevron-up' : 'chevron-down'" />
    </button>
    <div v-show="value" class="overflow-hidden mt-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

// components
import CeHeading2 from '~/components/atoms/CeHeading2.vue'
import CeIcon from '~/components/atoms/CeIcon.vue'

export default defineComponent({
  name: 'CeCollapseSimple',
  components: {
    CeHeading2,
    CeIcon,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  
  emits: ['input', 'change'],
  setup(props, { emit }) {
    const toggle = () => {
      emit('input', !props.value)
      emit('change', !props.value)
    }
    return {
      toggle,
    }
  },
})
</script>
