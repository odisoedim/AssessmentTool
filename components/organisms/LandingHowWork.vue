<template>
  <div class="pr-[372px]">
    <div>
      <CeHeading1>How does it work?</CeHeading1>
      <CeP class="block mt-6 mb-16 pr-6 box-content"
        >The Circularity Assessment Tool is an educative self-assessment to evaluate your business or a product through a circular lens. In the tool, you can use various frameworks to help create a baseline overview of all the circular efforts your organisation is currently undertaking. Using the outcomes of your assessment, you will learn about opportunities and challenges that can inform your circular pathway.</CeP
      >
    </div>
    <div>
      <div>
        <ul>
          <li
            v-for="(item, index) in steps"
            :key="item"
            class="pb-10 last:p-0 relative step"
          >
            <div
              class="
                absolute
                top-2
                z-10
                w-10
                h-10
                bg-kh-primary
                rounded-full
                flex-none
                items-center
                justify-center
                mr-8
                text-white text-center text-2xl
                leading-10
                font-medium
              "
            >
              {{ index + 1 }}
            </div>
            <div
              class="
                absolute
                top-0
                last:h-7
                left-5
                bottom-0
                border-l-2 border-kh-yellow border-dashed
                step_line
              "
            ></div>
            <CeHeading3 class="pl-16">{{ item }}</CeHeading3>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'

export default defineComponent({
  name: 'LandingHowWork',
  serverCacheKey: /* istanbul ignore next */ () => 'LandingHowWork',
  components: {
    CeHeading1,
    CeP,
    CeHeading3,
  },
  setup() {
    const steps = reactive([
      'Choose an assessment with a framework that fits your context',
      'Learn about circular strategies and read inspiring case studies from businesses all over the world',
      'Answer questions about how you implement circular strategies, as well as your opportunities and challenges ',
      'Get a score for how well you implement circular strategies and insights on where to improve ',
    ])
    return {
      steps,
    }
  },
})
</script>
<style scoped>
.step:first-child .step_line {
  @apply top-7;
}

.step:last-child .step_line {
  @apply h-7;
}
</style>
