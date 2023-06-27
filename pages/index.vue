<template>
  <div>
    <LandingLayoutCenter>
      <LazyHydrate when-idle>
        <LandingStart
          class="mt-28.5 mb-29"
          :image="startedImage"
          :alt="startedImageAlt"
        />
      </LazyHydrate>
      <LazyHydrate when-visible>
        <LandingAssessments
          v-if="assessments && assessments.length > 0"
          :assessments="assessments"
        />
      </LazyHydrate>
      <LazyHydrate never>
        <LandingAction v-if="benefit" class="mb-34" :actions="benefit" />
      </LazyHydrate>
    </LandingLayoutCenter>
    <LandingBanner
      class="mb-34"
      :title="bannerContent1.title"
      :description="bannerContent1.description"
      :button-content="bannerContent1.buttonContent"
    />
    <LandingLayoutCenter>
      <LazyHydrate never>
        <LandingHowWork class="mb-34" />
      </LazyHydrate>
      <LazyHydrate when-visible>
        <LandingFeedbacks v-if="carousel" class="mb-34" :feedbacks="carousel" />
      </LazyHydrate> 
        <LandingWhatDo class="mb-34" />
        <LandingWhyTrustUs class="mb-34" />
    </LandingLayoutCenter>
    <LandingBanner
      class="mb-34"
      :title="bannerContent2.title"
      :description="bannerContent2.description"
      :button-content="bannerContent2.buttonContent"
    >
    </LandingBanner>
    <LazyHydrate never>
      <LandingLayoutCenter>
        <LandingPartners class="mb-34" />
      </LandingLayoutCenter>
    </LazyHydrate>
    <LandingFooter />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  useRouter,
  watchEffect,
} from '@nuxtjs/composition-api'
import LazyHydrate from 'vue-lazy-hydration'
import { useUserinfo } from '@use/useUserinfo'

import { usePageMeta } from '@use/usePageMeta'
import { useLandingPageAsync } from '~/pages-helper'
import LandingLayoutCenter from '~/components/atoms/LandingLayoutCenter.vue'
import LandingStart from '~/components/organisms/LandingStart.vue'
import LandingPartners from '~/components/organisms/LandingPartners.vue'
import LandingBanner from '~/components/organisms/LandingBanner.vue'
import LandingFooter from '~/components/organisms/LandingFooter.vue'
import LandingAction from '~/components/organisms/LandingAction.vue'
import LandingWhyTrustUs from '~/components/organisms/LandingWhyTrustUs.vue'
import LandingWhatDo from '~/components/organisms/LandingWhatDo.vue'
import LandingHowWork from '~/components/organisms/LandingHowWork.vue'
import LandingAssessments from '~/components/organisms/LandingAssessments.vue'
import LandingFeedbacks from '~/components/organisms/LandingFeedbacks.vue'
export default defineComponent({
  name: 'Index',
  components: {
    LazyHydrate,
    LandingLayoutCenter,
    LandingStart,
    LandingPartners,
    LandingBanner,
    LandingFooter,
    LandingAction,
    LandingWhyTrustUs,
    LandingWhatDo,
    LandingHowWork,
    LandingAssessments,
    LandingFeedbacks,
  },
  setup() {
    const { result: userinfo } = useUserinfo()
    const router = useRouter()
    watchEffect(() => {
      if (userinfo && userinfo.value) {
        router.replace('/assessment/organisations')
      }
    })
    const { result } = useLandingPageAsync()
    usePageMeta(computed(() => result.value?.landingPage?.meta || null))
    const startedImage = computed(
      () =>
        result.value?.landingPage?.started_image.url
    )
    const startedImageAlt = computed(
      () => result.value?.landingPage?.started_image.alternativeText
    )
    const benefit = computed(() => result.value?.landingPage?.benefit)
    const carousel = computed(() => result.value?.landingPage?.carousel)
    const assessments = computed(
      () => result.value?.landingPage?.available_assessment
    )
    const bannerContent1 = reactive({
      title:
        'Do you want to make your business more circular, but are unsure where to start?',
      description: 'The Circularity Assessment Tool will help you.',
      buttonContent: 'Try it now',
    })
    const bannerContent2 = reactive({
      title:
        'Implementing circular thinking in your business has never been easier.',
      description: '',
      buttonContent: 'Start demo',
    })
    return {
      result,
      startedImage,
      startedImageAlt,
      benefit,
      carousel,
      assessments,
      bannerContent1,
      bannerContent2,
    }
  },
  head: {},
})
</script>
