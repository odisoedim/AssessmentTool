<template>
  <ce-modal
    v-model="visible"
    :show-header="false"
    top="125px"
    width="636"
    height="436"
    :close-by-icon="true"
  >
    <div class="relative h-full">
      <div class="px-16.5 pt-12 pb-11">
        <onboarding-introduce-welcome v-if="pageIndex === 1" />
        <onboarding-introduce-welcome2 v-if="pageIndex === 2">
          <ce-p class="my-4">This tool will help you:</ce-p>
        </onboarding-introduce-welcome2>
        <onboarding-introduce-welcome3 v-if="pageIndex === 3" />
      </div>
      <div
        class="
          absolute
          bottom-12
          h-10
          w-[520px]
          flex
          justify-center
          items-center
          left-12.5
          right-16.5
        "
      >
        <div class="absolute top-0 left-0">
          <ce-button theme="tertiary" @click="close">Skip intro</ce-button>
        </div>
        <ce-small-text>{{ pageIndex }}/3</ce-small-text>
        <div class="absolute top-0 right-0">
          <ce-button v-if="pageIndex !== 3" @click="nextPage">Next</ce-button>
          <ce-button v-else @click="close">Got it</ce-button>
        </div>
      </div>
    </div>
  </ce-modal>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from '@nuxtjs/composition-api'
import { useOrganisation } from '@use/useOrganisation'
import { useBoolean } from '~/composables'
import CeButton from '~/components/atoms/CeButton.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import OnboardingIntroduceWelcome from '~/components/molecules/OnboardingIntroduceWelcome.vue'
import OnboardingIntroduceWelcome2 from '~/components/molecules/OnboardingIntroduceWelcome2.vue'
import OnboardingIntroduceWelcome3 from '~/components/molecules/OnboardingIntroduceWelcome3.vue'
import CeModal from '~/components/molecules/CeModal.vue'
import CeP from '~/components/atoms/CeP.vue'
export default defineComponent({
  name: 'OrganisationIntroductionModal',
  components: {
    CeP,
    CeSmallText,
    CeButton,
    CeModal,
    OnboardingIntroduceWelcome,
    OnboardingIntroduceWelcome2,
    OnboardingIntroduceWelcome3,
  },
  setup() {
    const { bool: visible, close } = useBoolean(true)
    const pageIndex = ref(1)
    const { finishOnboarding } = useOrganisation()
    watch(visible, () => !visible.value && finishOnboarding('profile'))
    const nextPage = () => {
      pageIndex.value++
    }
    return { visible, nextPage, pageIndex, close }
  },
})
</script>
