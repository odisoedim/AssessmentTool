<template>
  <div class="flex">
    <div>
      <ceHeading3>How it works...</ceHeading3>
      <slot></slot>
      <ce-p>
        <ce-bullet
          v-for="item in [
            'Become familiar with the circular economy and strategies that are practical for your business',
            'Score how well you integrate circular strategies into your business',
            'Discover opportunities for improvement and challenges to address',
            'Read inspirational case studies and examples of best practices',
          ]"
          :key="item"
        >
          {{ item }}
        </ce-bullet>
      </ce-p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeBullet from '~/components/atoms/CeBullet.vue'

export default defineComponent({
  name: 'OnboardingIntroduceWelcome2',
  components: {
    CeBullet,
    CeHeading3,
    CeP,
  },
})
</script>
