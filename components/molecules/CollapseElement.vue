<template>
  <ce-collapse-simple v-model="expand" title="About this element">
    <div class="w-[768px]">
      <ce-p class="mb-8"> This element is to {{ description }} </ce-p>
      <ce-p>It consists of:</ce-p>
      <ce-heading5 v-for="item in children" :key="item">{{ item }}</ce-heading5>
    </div>
  </ce-collapse-simple>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onBeforeMount,
  ref,
  computed,
  useRoute,
} from '@nuxtjs/composition-api'
import CeCollapseSimple from '~/components/atoms/CeCollapseSimple.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import { useSurveyInfo } from '~/pages-helper/assessment/survey/surveyInfo'
import { useSurveyResultGroup } from '~/pages-helper/assessment/result/surveyResult'

export default defineComponent({
  name: 'CollapseElement',
  components: { CeCollapseSimple, CeP, CeHeading5 },
  setup() {
    const route = useRoute()
    const info = useSurveyInfo()
    const result = useSurveyResultGroup()
    const expand = ref<boolean>(false)
    onBeforeMount(() => {
      if (route.value.hash.includes('more')) {
        nextTick(() => {
          expand.value = true
        })
      }
    })

    const description = computed(() => info.value.description.toLowerCase())
    const children = computed(() => result.value.map((i) => i.name))
    return {
      expand,
      children,
      description,
    }
  },
})
</script>
