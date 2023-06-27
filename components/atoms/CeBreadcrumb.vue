<template>
  <div class="flex items-center">
    <template v-for="(item, index) in paths">
      <ce-icon
        v-if="index"
        :key="`${item.id}_icon`"
        name="chevron-right"
        :size="0.8"
      />
      <span
        :key="`${item.id}_link`"
        class="
          font-NotoSans
          text-sm
          font-normal
          cursor-pointer
          text-kh-grey
          leading-normal
        "
      >
        <nuxt-link v-if="item.nuxtLink" :to="item.to">
          {{ item.title }}
        </nuxt-link>
        <span v-else>
          {{ item.title }}
        </span>
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { BreadcrumbItem } from '~/type/base'
import CeIcon from '~/components/atoms/CeIcon.vue'

export default defineComponent({
  name: 'CeBreadcrumb',
  components: { CeIcon },
  props: {
    paths: {
      type: Array as PropType<BreadcrumbItem[]>,
      default: () => [],
    },
  },
})
</script>
