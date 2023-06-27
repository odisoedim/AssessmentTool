<template>
  <div class="w-[484px] h-[376px] relative inline-block align-top mb-6">
    <ce-image
      class="w-[163px] h-[216px] absolute top-24 left-13.5"
      :src="frameUrl"
    ></ce-image>
    <div class="absolute right-13.5 bottom-28">
      <ce-button theme="secondary">Explore more assessments</ce-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

// components
import CeButton from '~/components/atoms/CeButton.vue'
import CeImage from '~/components/atoms/CeImage.vue'


export default defineComponent({
  name: 'AssessmentExpandCard',
  components: { CeImage, CeButton },
  setup() {
    const frameUrl = ref(require(`~/assets/images/frame.png`))
    return {
      frameUrl,
    }
  },
})
</script>
