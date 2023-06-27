<template>
  <div>
    <ce-heading5 v-if="articleData.contenttype.name" class="mb-6"
      >{{ articleData.contenttype.name }} study</ce-heading5
    >
    <ce-heading2 v-if="articleData.title" class="mb-10 text-kh-grey-400">{{
      articleData.title
    }}</ce-heading2>
    <!-- eslint-disable vue/no-v-html -->
    <ce-p
      v-if="articleData.summary"
      class="mb-10 text-kh-grey-400"
      v-html="articleData.summary"
    ></ce-p>
    <!--eslint-enable-->
    <div
      v-for="item in subArticle"
      :key="item.title"
      class="mb-10 text-kh-grey-400"
    >
      <template v-if="item.content">
        <ce-heading5 class="mb-3 capitalize" :class="item.title">{{
          item.title
        }}</ce-heading5>
        <!-- eslint-disable vue/no-v-html -->
        <ce-p v-html="item.content"></ce-p>
        <!--eslint-enable-->
      </template>
    </div>
    <ce-small-text v-if="addedDate" class="mb-2"
      >Added: {{ addedDate }}</ce-small-text
    >
    <ce-small-text v-if="lastDate">Last edited: {{ lastDate }}</ce-small-text>
    <div class="mt-10">
      <div class="w-[152px] mb-2">
        <ce-image :src="khLogoUrl"></ce-image>
      </div>
      <ce-fine-print class="w-[495px]"
        >The Knowledge Hub is an open-access, collaborative library brimming
        with more than 3000 inspiring circular economy case studies. They
        deliver real-life proof that a circular economy can work and is
        beneficial.</ce-fine-print
      >
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
import { useDayjs } from '@use/useDayjs'
import CeHeading2 from '~/components/atoms/CeHeading2.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import { Article } from '~/type/article'
import CeP from '~/components/atoms/CeP.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import CeFinePrint from '~/components/atoms/CeFinePrint.vue'

export default defineComponent({
  name: 'CaseStudyArticle',
  components: {
    CeHeading2,
    CeHeading5,
    CeP,
    CeSmallText,
    CeFinePrint,
    CeImage,
  },
  props: {
    articleData: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  setup(props) {
    const dayjs = useDayjs()
    const addedDate = computed(() =>
      dayjs(props.articleData.created_at).format('MMM DD, YYYY')
    )
    const lastDate = computed(() =>
      dayjs(props.articleData.updated_at).format('MMM DD, YYYY')
    )
    const subArticle = computed(() => [
      { id: 1, title: 'problem', content: props.articleData.problem },
      { id: 2, title: 'solution', content: props.articleData.solution },
      { id: 3, title: 'outcome', content: props.articleData.outcome },
    ])
    const khLogoUrl = ref(require(`~/assets/images/knowledge-hub-logo.png`))
    return {
      addedDate,
      lastDate,
      subArticle,
      khLogoUrl,
    }
  },
})
</script>
