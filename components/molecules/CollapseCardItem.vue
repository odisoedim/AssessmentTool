<template>
  <div class="mb-8">
    <CeCardWithProgress
      :score="score"
      :progress="progress"
      :completed="completed"
      :org-id="orgId"
      :is-link="true"
      :class="
        expand
          ? 'shadow-normal bg-kh-blue-grey-100 !rounded-t-lg rounded-b-[0px]'
          : 'shadow-normal'
      "
    >
      <template #left>
        <div class="cursor-pointer ml-10.5 flex items-center" @click="toggle">
          <ce-heading4 class="mb-[0px] flex items-center">
            <HeaderUserButton
              class="mr-[14.19px] w-[34px] h-[34px]"
              :photo-url="orgImg"
              :first-name="title"
            />{{ title }}</ce-heading4
          >
          <button v-if="!disabled">
            <ce-icon :name="expand ? 'chevron-up' : 'chevron-down'" />
          </button>
        </div>
      </template>
    </CeCardWithProgress>

    <div
      v-show="expand"
      class="rounded-b-lg pt-[32px] px-[21px] shadow-normal bg-white ce-tabs-content"
    >
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, inject, Ref } from '@nuxtjs/composition-api'

// components
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import CeIcon from '~/components/atoms/CeIcon.vue'
import CeCardWithProgress from '~/components/molecules/CeCardWithProgress.vue'
import HeaderUserButton from '~/components/molecules/HeaderUserButton.vue'

export default defineComponent({
  name: 'CollapseCardItem',
  components: {
    CeHeading4,
    CeIcon,
    CeCardWithProgress,
    HeaderUserButton,
  },
  props: {
    title: {
      type: String,
      default: '[Substrategy]',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    score: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Number,
      default: 0,
    },
    orgImg: {
      type: String,
      default: '',
    },
    orgId: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const activeNames = inject('activeNames') as Ref

    const handleItemClick = inject('handleItemClick') as (
      name: string | number
    ) => void

    const toggle = () => {
      handleItemClick(props.title)
    }

    const expand = computed(() => {
      return activeNames.value.includes(props.title)
    })

    return {
      expand,
      toggle,
    }
  },
})
</script>
