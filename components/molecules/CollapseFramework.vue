<template>
  <ce-collapse-simple v-model="expand" title="About this framework">
    <div class="w-[768px]">
      <!-- eslint-disable vue/no-v-html -->
      <ce-p class="mb-4 markdown__content" v-html="markdownToHtml"></ce-p>
      <!--eslint-enable-->
      <template v-if="frameworks.length">
        <ce-p class="mb-6">
          It consists of {{ frameworks.length }} elements:
        </ce-p>
        <ul class="pl-4 -mb-2">
          <li v-for="framework in frameworks" :key="framework.id" class="pb-2">
            <ce-heading5>
              {{ framework.name }}
            </ce-heading5>
          </li>
        </ul>
      </template>
    </div>
  </ce-collapse-simple>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onBeforeMount,
  computed,
  PropType,
} from '@nuxtjs/composition-api'
import { Marked } from 'marked-ts'
import { useParamsId } from '@use/useParamsId'
import { useUserinfo } from '@use/useUserinfo'
import CeCollapseSimple from '~/components/atoms/CeCollapseSimple.vue'
import { useInjectAssessmentResult } from '~/pages-helper/assessment/overview/_id'
import CeP from '~/components/atoms/CeP.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import { FrameworkElement } from '~/type/frameworkElement'

export default defineComponent({
  name: 'CollapseFramework',
  components: { CeCollapseSimple, CeP, CeHeading5 },
  props: {
    frameworks: {
      type: Array as PropType<FrameworkElement[]>,
      default: () => [],
    },
  },
  setup(props) {
    const id = useParamsId()
    const { frameworkElements } = !props.frameworks.length
      ? useInjectAssessmentResult()
      : { frameworkElements: ref([]) }
    let VisitedAssessment: Record<string, Array<string>> = {}
    const expand = ref(false)

    const markDown = computed(() => {
      if (props.frameworks.length)
        return props.frameworks[0].framework.description
      if (!frameworkElements?.value?.length) return ''
      return frameworkElements.value[0].framework.description
    })
    const markdownToHtml = computed(() => {
      return Marked.parse(markDown.value || '')
    })
    const { result } = useUserinfo()

    onBeforeMount(() => {
      const userId = result.value?.userinfo.id + ''
      const getVisitedLocal = localStorage.getItem('VisitedAssessment')
      try {
        VisitedAssessment =
          (getVisitedLocal && JSON.parse(getVisitedLocal)) || {}
      } catch (e: any) {
        VisitedAssessment = {}
        throw new Error(e)
      }

      if (VisitedAssessment[userId]) {
        if (VisitedAssessment[userId].includes(id.value)) {
          expand.value = false
        } else {
          expand.value = true
          VisitedAssessment[userId].push(id.value)
        }
        localStorage.setItem(
          'VisitedAssessment',
          JSON.stringify(VisitedAssessment)
        )
        return
      }
      expand.value = true
      VisitedAssessment[userId] = [id.value]
      localStorage.setItem(
        'VisitedAssessment',
        JSON.stringify(VisitedAssessment)
      )
    })
    return {
      expand,
      frameworkElements,
      markdownToHtml,
    }
  },
})
</script>
<style scoped>
.markdown__content >>> p {
  margin-bottom: 32px;
}
</style>
