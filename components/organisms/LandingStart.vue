<template>
  <div class="flex justify-between">
    <div class="w-[438px] pt-11.5 pr-18">
      <CeImage
        class="w-[240px] h-[58px] mb-13.5"
        :src="CATLogo"
        alt="Circularity Assessment Tool Logo"
      ></CeImage>
      <CeHeading2 class="font-medium mb-11"
        >Assess. Understand. Act.</CeHeading2
      >
      <CeHeading3 class="mb-12"
        >Evaluate your progress on key circular strategies and discover
        opportunities to make your business or product more
        circular.</CeHeading3
      >
      <Ce-button class="px-8 h-14" @click="SignIn"
        ><span class="text-lg leading-6">Get started</span></Ce-button
      >
    </div>
    <CeImage
      class="w-[575px] h-[557px]"
      :src="image"
      :alt="alt ? alt : 'image'"
    ></CeImage>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CeImage from '~/components/atoms/CeImage.vue'
import CeHeading2 from '~/components/atoms/CeHeading2.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import { gotoLogin } from '~/util/auth'
export default defineComponent({
  name: 'LandingStart',
  serverCacheKey: /* istanbul ignore next */ (props: { image: string }) =>
    `LandingStart_${props.image}`,
  components: {
    CeImage,
    CeHeading2,
    CeHeading3,
    CeButton,
  },
  props: {
    image: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
  },
  setup() {
    const CATLogo = ref(require(`~/assets/images/CATLogo.png`))
    return {
      CATLogo,
      SignIn: () => gotoLogin(true),
    }
  },
})
</script>
