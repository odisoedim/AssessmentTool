<template>
  <div
    class="
      shadow-landing-assessments
      rounded-lg
      bg-kh-blue-grey-100
      pt-10.5
      pl-16
      pr-16.5
      pb-20
    "
  >
    <div class="relative h-[253px]">
      <div
        v-for="(item, index) in feedbacks"
        :key="item.id"
        class="
          flex
          absolute
          transition-opacity
          duration-300
          ease-out-in
          feedback-card
        "
        :class="[
          isShowFeedback && index === currentFeedback
            ? 'z-20 opacity-100'
            : 'z-10 opacity-0',
        ]"
      >
        <CeImage
          class="w-[212px] h-[212px] rounded-full flex-none"
          :src="item.avatar.url"
          :alt="item.avatar.alternativeText"
        ></CeImage>
        <div class="flex-auto pt-9.5 ml-16">
          <CeHeading3>{{ item.description }}</CeHeading3>
          <CeHeading4 class="font-bold mt-4">{{ item.title }}</CeHeading4>
        </div>
      </div>
      <div
        class="absolute left-0 top-[244px] flex w-[212px] justify-center z-30"
      >
        <div
          v-for="(item, index) in feedbacks"
          :key="item.id"
          class="
            w-12
            h-12
            cursor-pointer
            flex
            justify-center
            items-center
            transition-background-color
            duration-300
            ease-out-in
          "
          @click="onFeedbackIndexBtnClick(index)"
        >
          <div
            class="w-5.5 h-5.5 rounded-full index-btn"
            :class="[
              index === currentFeedbackBtn
                ? 'bg-kh-primary'
                : 'bg-kh-blue-grey-400',
            ]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import { LandingCarousel } from '~/type/landingPage'
import CeImage from '~/components/atoms/CeImage.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'

export default defineComponent({
  name: 'LandingFeedbacks',
  serverCacheKey: /* istanbul ignore next */ (props: {
    feedbacks: LandingCarousel[]
  }) => `LandingFeedbacks_${props.feedbacks.map((i) => i.id).join('_')}`,
  components: { CeImage, CeHeading3, CeHeading4 },
  props: {
    feedbacks: {
      type: Array as PropType<LandingCarousel[]>,
      default: () => [],
    },
  },
  setup() {
    const currentFeedback = ref(0)
    const currentFeedbackBtn = ref(0)
    const isShowFeedback = ref(true)
    const onFeedbackIndexBtnClick = (index: number) => {
      isShowFeedback.value = false
      currentFeedbackBtn.value = index
      setTimeout(() => {
        currentFeedback.value = index
        isShowFeedback.value = true
      }, 300)
    }
    return {
      currentFeedback,
      currentFeedbackBtn,
      isShowFeedback,
      onFeedbackIndexBtnClick,
    }
  },
})
</script>
