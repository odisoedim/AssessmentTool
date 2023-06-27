<template>
  <div class="h-full flex-1 flex justify-end items-center pr-15">
    <div
      v-for="(i, index) in tabs"
      :key="i"
      class="h-full w-40 mx-7.5 flex justify-center items-center relative cursor-pointer select-none header-tabs__tab"
      :class="{ 'cursor-not-allowed': index === 1 }"
      @click="() => active(index)"
    >
      <ce-menu-item :active="index === isAssessmentPage">{{ i }}</ce-menu-item>
      <div
        v-if="index === isAssessmentPage"
        class="absolute h-[3px] w-full bg-kh-primary bottom-0 left-0 header-tabs__active-bar"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import CeMenuItem from '~/components/atoms/CeMenuItem.vue'

export default defineComponent({
  name: 'HeaderTabs',
  components: { CeMenuItem },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isAssessmentPath =
      route.value.path.match(/\/assessment/) ||
      route.value.path.match(/\/profile/)
    const isAssessmentPage = computed(() => isAssessmentPath && 0)
    const active = (index: number) => {
      switch (index) {
        case 0:
          router.push('/assessment')
          break
      }
    }
    return {
      tabs: ref(['Assessments', 'Dashboard']),
      isAssessmentPage,
      active,
    }
  },
})
</script>
