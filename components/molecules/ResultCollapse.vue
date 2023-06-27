<template>
  <div>
    <div
      class="
        flex
        h-30
        justify-between
        rounded-lg
        overflow-hidden
        result-collapse__header
      "
      :class="[{ 'cursor-pointer': expand }, shadowClass]"
      @click="toggle"
    >
      <div class="ml-10.5 flex items-center">
        <ce-heading4 :class="{ 'text-kh-grey-200': notApplicable }">{{
          title
        }}</ce-heading4>
        <ce-icon
          v-if="expand"
          class="ml-4"
          :name="visible ? 'chevron-up' : 'chevron-down'"
        />
      </div>
      <ResultStatus
        :not-applicable="notApplicable"
        :progress="progress"
        :score="score"
      />
    </div>
    <div v-if="expand" v-show="visible" class="result-collapse__body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useBoolean } from '~/composables'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import CeIcon from '~/components/atoms/CeIcon.vue'
import ResultStatus from '~/components/molecules/ResultStatus.vue'

export default defineComponent({
  name: 'ResultCollapse',
  components: { ResultStatus, CeIcon, CeHeading4 },
  props: {
    title: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: -1,
    },
    progress: {
      type: Number,
      default: -1,
    },
    notApplicable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const expand = computed(() => {
      if (props.notApplicable) return false
      return props.progress === 100
    })

    const { bool: visible, toggle } = useBoolean()
    const shadowClass = computed(() => {
      if (!expand.value) return 'shadow-card'
      if (visible.value) return 'shadow-purple hover:shadow-normal-hover'
      if (!visible.value) return 'shadow-normal hover:shadow-normal-hover'
    })
    return {
      expand,
      visible,
      toggle: () => expand.value && toggle(),
      shadowClass,
    }
  },
})
</script>
