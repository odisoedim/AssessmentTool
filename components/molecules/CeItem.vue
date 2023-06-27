<template>
  <ce-item-card
    :class="{
      'bg-kh-blue-grey-200 px-4 pt-[27px] pb-[29px] w-[570px] shadow-none':
        active,
    }"
  >
    <ce-heading4>
      <slot />
    </ce-heading4>
  </ce-item-card>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeItemCard from '~/components/atoms/CeItemCard.vue'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'

export default defineComponent({
  name: 'CeItem',
  components: {
    CeItemCard,
    CeHeading4,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
