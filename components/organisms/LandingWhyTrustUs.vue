<template>
  <div>
    <LandingSectionTitle class="mb-12">Why trust us?</LandingSectionTitle>
    <ul class="w-[631px]">
      <li>
        <CeHeading3 class="flex justify-center items-center"
          ><span
            class="
              inline-block
              w-7.5
              h-7.5
              bg-kh-primary
              rounded-full
              flex-none
              items-center
              justify-center
              mr-8
            "
          ></span
          ><span
            >The Circularity Assessment Tool is based on Circle Economy’s
            <strong>ten years of expertise</strong> in working with businesses
            all over the world.</span
          ></CeHeading3
        >
      </li>
      <li class="my-8">
        <CeHeading3 class="flex justify-center items-center"
          ><span
            class="
              inline-block
              w-7.5
              h-7.5
              bg-kh-primary
              rounded-full
              flex-none
              items-center
              justify-center
              mr-8
            "
          ></span
          ><span
            >The Circularity Assessment Tool is
            <strong>developed hand-in-hand with users</strong> and partners to
            co-create the best possible features.</span
          ></CeHeading3
        >
      </li>
      <li>
        <CeHeading3 class="flex justify-center items-center"
          ><span
            class="
              inline-block
              w-7.5
              h-7.5
              bg-kh-primary
              rounded-full
              flex-none
              items-center
              justify-center
              mr-8
            "
          ></span
          ><span
            >Our interconnected digital products means the tool leverages a
            <strong>shared library of content and data.</strong></span
          ></CeHeading3
        >
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import LandingSectionTitle from '~/components/atoms/LandingSectionTitle.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
export default defineComponent({
  name: 'LandingWhyTrustUs',
  serverCacheKey: /* istanbul ignore next */ () => `LandingWhyTrustUs`,
  components: {
    LandingSectionTitle,
    CeHeading3,
  },
})
</script>
