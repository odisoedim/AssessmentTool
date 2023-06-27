<template>
  <div>
    <div
      v-if="title"
      class="py-[11.5px] px-4 bg-white rounded-t-lg shadow-normal inline-block relative"
    >
      <div
        class="h-8 absolute top-full left-0 bg-white tab-active__cover-shadow"
      ></div>
      <ce-menu-item active>{{ title }}</ce-menu-item>
    </div>

    <div
      class="rounded-lg rounded-tl-none shadow-normal bg-white ce-tabs-content"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeMenuItem from '~/components/atoms/CeMenuItem.vue'

export default defineComponent({
  name: 'CeTabs',
  components: {
    CeMenuItem,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
})
</script>
<style scoped>
.tab-active__cover-shadow {
  width: calc(100% + 24px);
}
</style>
