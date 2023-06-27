<template>
  <div>
    <CeHeading1 class="mb-28"
      >With Circularity Assessment Tool, you can:</CeHeading1
    >
    <LandingActionContent
      v-for="item in actions"
      :key="item.id"
      :title="item.title"
      :content="item.content"
      :image="item.image.url"
      :image-alt="item.image.alternativeText"
      class="odd:flex-row-reverse mb-28 last:m-0"
    ></LandingActionContent>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { LandingBenefit } from '~/type/landingPage'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import LandingActionContent from '~/components/molecules/LandingActionContent.vue'

export default defineComponent({
  name: 'LandingAction',
  serverCacheKey: /* istanbul ignore next */ (props: {
    actions: LandingBenefit[]
  }) => `LandingAction_${props.actions.map((i) => i.id).join('_')}`,
  components: {
    CeHeading1,
    LandingActionContent,
  },
  props: {
    actions: {
      type: Array as PropType<LandingBenefit[]>,
      default: () => [],
    },
  },
})
</script>
