<template>
  <div class="flex justify-between items-center">
    <CeImage
      class="w-[504px] h-[350px]"
      :src="imageSrc"
      :alt="imageAlt"
    ></CeImage>
    <div class="w-[444px]">
      <CeHeading2 class="font-medium"
        ><span
          class="inline-block w-[19px] h-[19px] bg-kh-grey rounded-full mr-7"
        ></span
        >{{ title }}</CeHeading2
      >
      <CeHeading3 class="pl-12 mt-4">{{ content }}</CeHeading3>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import CeImage from '~/components/atoms/CeImage.vue'
import CeHeading2 from '~/components/atoms/CeHeading2.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
export default defineComponent({
  name: 'LandingActionContent',
  components: { CeImage, CeHeading2, CeHeading3 },
  props: {
    image: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const imageSrc = computed(() => props.image)
    return {
      imageSrc,
    }
  },
})
</script>
