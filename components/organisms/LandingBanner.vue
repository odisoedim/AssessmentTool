<template>
  <div class="bg-kh-primary-300">
    <LandingLayoutCenter>
      <div class="w-[924px] py-22 flex justify-between items-center">
        <div class="w-[660px]">
          <CeHeading1 class="text-white">
            {{ title }}
          </CeHeading1>
          <CeHeading2 v-if="description" class="text-white mt-6">
            {{ description }}
          </CeHeading2>
        </div>

        <CeButton class="px-8 h-14" theme="yellow" @click="SignIn"
          ><span class="text-lg leading-6">{{ buttonContent }}</span></CeButton
        >
      </div>
    </LandingLayoutCenter>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

// components
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeHeading2 from '~/components/atoms/CeHeading2.vue'
import CeButton from '~/components/atoms/CeButton.vue'
// atoms
import LandingLayoutCenter from '~/components/atoms/LandingLayoutCenter.vue'
// utils
import { gotoLogin } from '~/util/auth'

export default defineComponent({
  name: 'LandingBanner',
  serverCacheKey: /* istanbul ignore next */ (props: { title: string }) =>
    `LandingBanner_${props.title}`,
  components: {
    CeHeading1,
    CeHeading2,
    CeButton,
    LandingLayoutCenter,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    buttonContent: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {
      SignIn: () => gotoLogin(true),
    }
  },
})
</script>
