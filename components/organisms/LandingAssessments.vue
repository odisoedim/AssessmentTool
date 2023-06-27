<template>
  <div
    class="
      pt-20
      pb-24
      px-[66px]
      bg-kh-blue-grey-100
      shadow-landing-assessments
      rounded-lg
      mb-[136px]
    "
  >
    <CeHeading1>Which assessments are available?</CeHeading1>
    <div class="mt-13 relative h-[262px]">
      <div
        v-for="(item, index) in assessments"
        v-show="currentCard === index || currentCard === -1"
        :key="item.id"
        class="absolute left-0 top-0"
        :class="[
          {
            'left-0': index === 0,
            'left-1/2 -translate-x-1/2': index === 1,
          },
        ]"
      >
        <LandingAssessmentCard
          :is-expand="currentCard === index && isCardExpanded"
          class="landing-assessment-card"
          @expand="onCardExpand(index)"
          @close="onCardClose"
        >
          <template #left>
            <CeImage
              :src="item.image.url"
              :alt="item.image.alternativeText"
              class="h-[151px]"
            />
            <div
              class="
                h-[111px]
                flex
                justify-center
                items-center
                px-5.5
                py-6.5
                bg-kh-blue-grey-100
              "
            >
              <CeHeading3
                class="
                  text-kh-primary text-center
                  landing-assessment-card-title
                  transition-all
                "
                >{{ item.title }}</CeHeading3
              >
            </div>
          </template>
          <template #right>
            <div class="pl-10.5 pr-8">
              <div class="flex">
                <CeSmallText class="flex-none mr-6">{{
                  item.duration
                }}</CeSmallText>
                <CeSmallText class="flex-auto">{{
                  item.key_elements
                }}</CeSmallText>
              </div>
              <CeP class="mt-4">{{ item.content }}</CeP>
              <div class="mt-6">
                <Ce-button
                  root-type="a"
                  :href="item.button_link"
                  :target="
                    item.button_link ===
                    'https://docs.google.com/forms/d/e/1FAIpQLSepm2fNr7IWlrbLLl74ot-Cca7GJorZTfli-j0pqnJfNl82SA/viewform'
                      ? '_blank'
                      : ''
                  "
                  rel="noopener norefferrer"
                  class="px-4 py-2"
                  ><span class="text-sm leading-6">{{
                    item.button_text
                  }}</span></Ce-button
                >
              </div>
            </div>
          </template>
        </LandingAssessmentCard>
      </div>
      <div
        v-show="currentCard === 100 || currentCard === -1"
        class="absolute top-0"
        :class="{
          'left-0': assessments.length === 0,
          'left-1/2 -translate-x-1/2': assessments.length === 1,
          'right-0': assessments.length === 2,
        }"
      >
        <LandingAssessmentCard
          class="landing-assessment-card"
          :is-expand="currentCard === 100 && isCardExpanded"
          :is-right-card="assessments.length === 2"
          @expand="onCardExpand(100)"
          @close="onCardClose"
        >
          <template #left>
            <div
              class="
                bg-kh-blue-grey-100
                landing-assessment-card-left__cover
                h-full
                pt-[176px]
                pl-[70px]
              "
              :style="{ backgroundImage: `url(${image})` }"
            >
              <CeHeading3
                class="
                  text-kh-primary text-center
                  landing-assessment-card-title
                  transition-all
                "
                >Customise an assessment</CeHeading3
              >
            </div>
          </template>
          <template #right>
            <div class="pl-10.5 pr-8">
              <CeSmallText
                >Want an assessment that is tailored to your
                purpose?</CeSmallText
              >
              <div class="mt-4">
                <CeP>We can customise an assessment. Choose your:</CeP>
                <ul class="list-disc pl-6">
                  <li><CeP>Framework</CeP></li>
                  <li><CeP>Industry</CeP></li>
                  <li>
                    <CeP>Depth of assessment (intro, medium, expert)</CeP>
                  </li>
                </ul>
              </div>

              <div class="mt-6">
                <Ce-button
                  theme="secondary"
                  root-type="a"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSepm2fNr7IWlrbLLl74ot-Cca7GJorZTfli-j0pqnJfNl82SA/viewform"
                  target="_blank"
                  rel="noopener norefferrer"
                  class="px-4 py-2"
                  ><span class="text-sm leading-6"
                    >Customise an assessment</span
                  ></Ce-button
                >
              </div>
            </div>
          </template>
        </LandingAssessmentCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from '@nuxtjs/composition-api'
import { LandingAvailableAssessment } from '~/type/landingPage'
import LandingAssessmentCard from '~/components/molecules/LandingAssessmentCard.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import CeButton from '~/components/atoms/CeButton.vue'
export default defineComponent({
  name: 'LandingAssessments',
  serverCacheKey: /* istanbul ignore next */ (props: {
    assessments: LandingAvailableAssessment[]
  }) => `LandingAssessments_${props.assessments.map((i) => i.id).join('_')}`,
  components: {
    CeHeading1,
    CeHeading3,
    CeSmallText,
    CeP,
    LandingAssessmentCard,
    CeImage,
    CeButton,
  },
  props: {
    assessments: {
      type: Array as PropType<LandingAvailableAssessment[]>,
      default: () => [],
    },
  },
  setup() {
    const image = ref(require(`~/assets/images/AssessmentCardcust.png`))
    const currentCard = ref(-1)
    const isCardExpanded = ref(false)
    const onCardExpand = (value: number) => {
      currentCard.value = value
      isCardExpanded.value = true
    }
    const onCardClose = () => {
      isCardExpanded.value = false
      setTimeout(() => {
        currentCard.value = -1
      }, 200)
    }

    return {
      image,
      currentCard,
      isCardExpanded,
      onCardExpand,
      onCardClose,
    }
  },
})
</script>
<style scoped>
.landing-assessment-card:hover .landing-assessment-card-title {
  @apply font-bold;
}
.landing-assessment-card:active .landing-assessment-card-title {
  @apply text-kh-primary-400;
}
.landing-assessment-card-left__cover {
  background-size: 208px 240px;
  background-position: left bottom;
  background-repeat: no-repeat;
}
</style>
