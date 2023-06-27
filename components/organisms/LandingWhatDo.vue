<template>
  <div>
    <CeHeading1 class="mb-26"
      >What do we want to achieve with the Circularity Assessment Tool?</CeHeading1
    >
    <CeImage
      class="w-[986px]"
      :src="landingWhatDoImg1"
      alt="Guide businesses towards circular strategies"
    ></CeImage>
    <CeImage
      class="w-[814px] ml-[204px]"
      :src="landingWhatDoImg2"
      alt="Involve all businesses in our goal to double global circularity by 2032"
    ></CeImage>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeImage from '~/components/atoms/CeImage.vue'
export default defineComponent({
  name: 'LandingWhatDo',
  serverCacheKey: /* istanbul ignore next */ () => `LandingWhatDo`,
  components: {
    CeHeading1,
    CeImage,
  },
  setup() {
    const landingWhatDoImg1 = ref(
      require(`~/assets/images/LandingWhatDoImg1.png`)
    )
    const landingWhatDoImg2 = ref(
      require(`~/assets/images/LandingWhatDoImg2.png`)
    )
    return {
      landingWhatDoImg1,
      landingWhatDoImg2,
    }
  },
})
</script>
