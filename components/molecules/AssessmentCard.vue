<template>
  <div
    class="text-left bg-white w-[484px] rounded-lg overflow-hidden align-top box-border inline-block mr-[22px] mb-10 shadow-new-card ease-out transition-all hover:shadow-new-card-hover hover-child hover:-translate-y-1 active:shadow-new-card-pressed active:translate-y-2"
    @click="handleSetOrganisation(orgId, to)"
  >
    <div class="inline-block cursor-pointer">
      <div class="relative">
        <assessment-card-image :loading="loading" :src="image" />
        <template v-if="!loading">
          <div
            v-if="progress < 100"
            class="absolute bottom-0 right-0 w-[152px] h-[76px] bg-white rounded-tl-3xl px-4 pt-[22px]"
          >
            <survey-progress-line
              bar-background-color="grey"
              small-text
              :progress="progress"
            />
          </div>
          <div
            v-else
            class="absolute right-0 -bottom-8 w-[158px] h-[162px] bg-white rounded-l-half px-4 pt-4"
          >
            <survey-score-circle
              bar-background-color="grey"
              diam="126"
              small-text
              :score="score"
            />
          </div>
        </template>
      </div>
      <assessment-card-text
        :card-title="cardTitle"
        :key-element="keyElement"
        :loading="loading"
        :user-profile-info="userProfileInfo"
        :last-edited="lastDate"
      ></assessment-card-text>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  useRouter,
} from '@nuxtjs/composition-api'

// libs
import dayjs from 'dayjs'
import { provideDayjs } from '@use/useDayjs'

// components
import AssessmentCardText from '~/components/atoms/AssessmentCardText.vue'
import SurveyProgressLine from '~/components/molecules/SurveyProgressLine.vue'
import SurveyScoreCircle from '~/components/molecules/SurveyScoreCircle.vue'
import AssessmentCardImage from '~/components/atoms/AssessmentCardImage.vue'

// type
import { AssessmentLevel } from '~/type/enum'

// hooks
import { useOrganisation } from '~/composables/useOrganisation'

export default defineComponent({
  name: 'AssessmentCard',
  components: {
    AssessmentCardText,
    AssessmentCardImage,
    SurveyProgressLine,
    SurveyScoreCircle,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    assessmentId: {
      type: Number,
      required: true,
    },
    cardTitle: {
      type: String,
      default: '',
    },
    keyElement: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    // 0 - 100
    progress: {
      type: Number,
      default: 0,
    },
    // 0 - 100
    score: {
      type: Number,
      default: 0,
    },
    tier: {
      type: Number as PropType<AssessmentLevel>,
      default: AssessmentLevel.Tier3,
    },
    lastEdited: {
      type: String,
      default: '',
    },
    userProfileInfo: {
      type: Object,
      default: () => {
        return {
          firstName: '',
          picture: '',
        }
      },
    },
    orgId: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { setOrganisation } = useOrganisation()
    const router = useRouter()
    provideDayjs(dayjs)
    const lastDate = computed(() =>
      props.lastEdited
        ? `${dayjs(props.lastEdited).format('ddd, MMM DD YYYY')} at ${dayjs(
            props.lastEdited
          ).format('hh:mm')}`
        : ''
    )

    const handleSetOrganisation: (id: any, redirect: any) => void = (
      id,
      redirect = '/assessment'
    ) => {
      router.push(redirect)

      setOrganisation(id)
    }

    const to = computed(() => {
      switch (props.tier) {
        case AssessmentLevel.Tier1:
          return `/demoAssessment/result/${props.assessmentId}`
        case AssessmentLevel.Tier3:
          return `/assessment/overview/${props.assessmentId}`
      }
    })

    return { to, handleSetOrganisation, lastDate }
  },
})
</script>
