<template>
  <div
    role="button"
    :class="loading ? 'pointer-events-none' : 'pointer-events-auto'"
    class="
      text-left
      bg-white
      rounded-lg
      overflow-hidden
      w-[264px]
      h-[304px]
      inline-block
      shadow-new-card
      ease-out
      transition-all
      hover:shadow-new-card-hover hover-child hover:-translate-y-1
      active:shadow-new-card-pressed active:translate-y-2
    "
  >
    <div class="p-6 h-1/2">
      <div v-if="loading" class="-mb-2.5">
        <ce-skeleton v-for="n in 4" :key="n" class="h-4 mg-1.25 mb-2.5" />
      </div>
      <ce-heading5 v-else class="truncate-4">
        {{ text }}
      </ce-heading5>
    </div>
    <div class="h-1/2">
      <ce-skeleton v-if="loading" class="h-full w-full" />
      <div
        v-else-if="image"
        class="h-full w-full bg-cover bg-center bg-no-repeat case-study-img"
        :style="`background-image: url(${image})`"
      />
      <CeImage
        v-else
        :src="noImage"
        class="h-full w-full bg-kh-blue-grey-100"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeSkeleton from '~/components/atoms/CeSkeleton.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import CeImage from '~/components/atoms/CeImage.vue'

export default defineComponent({
  name: 'CaseStudyCard',
  components: { CeImage, CeHeading5, CeSkeleton },
  props: {
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const noImage = require('~/assets/images/NoImage.png')
    return { noImage }
  },
})
</script>
