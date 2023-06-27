<template>
  <div class="relative">
    <ce-heading3 class="mb-2"
      >Welcome to Circularity Assessment Tool!</ce-heading3
    >
    <div class="w-[380px]">
      <ce-p class="mb-6.5">This tool will help you:</ce-p>
      <ce-p>
        <ce-bullet
          >Become familiar with the circular economy and strategies that are
          practical for your business</ce-bullet
        >
        <ce-bullet>
          Score how well you integrate circular strategies into your business
        </ce-bullet>
        <ce-bullet>
          Discover opportunities for improvement and challenges to address
        </ce-bullet>
        <ce-bullet>
          Read inspirational case studies and examples of best practices
        </ce-bullet>
      </ce-p>
    </div>
    <div class="mt-3 flex justify-end">
      <ce-button @click="() => $emit('next')">Next</ce-button>
    </div>
    <div class="h-[216px] w-[94px] absolute right-0 top-17.25">
      <ce-image :src="orgBoarding"></ce-image>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeBullet from '~/components/atoms/CeBullet.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import CeButton from '~/components/atoms/CeButton.vue'

export default defineComponent({
  name: 'OrganisationBoardingWelcome',
  components: { CeButton, CeImage, CeBullet, CeP, CeHeading3 },
  emits: ['next'],
  setup() {
    const orgBoarding = require('~/assets/images/orgBoarding.png')
    return {
      orgBoarding,
    }
  },
})
</script>
