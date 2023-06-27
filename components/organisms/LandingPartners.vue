<template>
  <div>
    <LandingSectionTitle>Partners we work with</LandingSectionTitle>
    <CeHeading3 class="font-medium leading-6 mt-17">
      The Circularity Assessment Tool is supported by:
    </CeHeading3>
    <div class="mt-16 flex w-[312px] h-27 justify-between items-center">
      <CeImage
        class="w-[141px] h-10 ml-3.5"
        :src="dehogedennenLogo"
        alt="Dehogedennen"
      ></CeImage>
      <CeImage class="w-15 h-11 mr-4" :src="rb2Logo" alt="Rb2"></CeImage>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CeImage from '~/components/atoms/CeImage.vue'
import LandingSectionTitle from '~/components/atoms/LandingSectionTitle.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'

export default defineComponent({
  name: 'LandingPartners',
  serverCacheKey: /* istanbul ignore next */ () => `LandingPartners`,
  components: {
    CeImage,
    LandingSectionTitle,
    CeHeading3,
  },
  setup() {
    const dehogedennenLogo = ref(
      require(`~/assets/images/DEHOGEDENNENLogo.png`)
    )
    const rb2Logo = ref(require(`~/assets/images/RB2Logo.png`))
    return {
      dehogedennenLogo,
      rb2Logo,
    }
  },
})
</script>
