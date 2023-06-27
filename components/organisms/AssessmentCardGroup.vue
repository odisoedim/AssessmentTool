<template>
  <client-only>
    <div class="text-0 -mr-16 flex flex-wrap">
      <template v-if="loading">
        <assessment-card
          v-for="i in 2"
          :key="i"
          :assessment-id="i"
          class="mb-16"
          :loading="true"
        />
      </template>
      <template v-else>
        <assessment-card
          v-for="item in assessments"
          :key="`${item.tier}_${item.id}`"
          :assessment-id="+item.id"
          :image="item.image ? item.image.url : ''"
          :card-title="item.name"
          :key-element="item.frameworks"
          :progress="item.progress"
          :score="item.score"
          :tier="item.tier"
          :last-edited="item.lastEdited"
          :user-profile-info="item.userProfileInfo"
          :org-id="+orgId"
        />
      </template>
    </div>
  </client-only>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

// components
import AssessmentCard from '~/components/molecules/AssessmentCard.vue'

// types
import { Assessment } from '~/type/assessment'
import { AssessmentLevel } from '~/type/enum'

export default defineComponent({
  name: 'AssessmentCardGroup',
  components: { AssessmentCard },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    orgId: {
      type: Number,
      default: 0,
    },
    assessments: {
      type: Array as PropType<
        (Assessment & {
          progress: number
          score: number
          tier?: AssessmentLevel
          frameworks: string
          lastEdited: string
          userProfileInfo: object
        })[]
      >,
      required: true,
    },
  },
})
</script>
