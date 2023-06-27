<template>
  <div class="relative">
    <ceHeading3>How it works...</ceHeading3>
    <ce-p class="mt-6.5 w-[422px]">
      Assessments are saved organisation-wide, and you can complete an
      assessment alone or together with other members of your organisation. If
      completing it together, you will be able to see and edit each other’s
      answers.
    </ce-p>
    <ce-p class="mt-4 w-[405px]">
      All your answers can be saved, so it is possible to leave an assessment at
      any time and resume later. Your responses can also be edited at any time.
    </ce-p>
    <div class="absolute right-0 bottom-0">
      <ce-image :src="image" class="w-[117px] h-34"></ce-image>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeImage from '~/components/atoms/CeImage.vue'

export default defineComponent({
  name: 'OnboardingIntroduceWelcome3',
  components: {
    CeHeading3,
    CeP,
    CeImage,
  },
  setup() {
    const image = ref(require(`~/assets/images/labels.png`))
    return {
      image,
    }
  },
})
</script>
