<template>
  <div class="flex mt-7.5">
    <div class="w-[333px]">
      <ceHeading3>Welcome to the Circularity Assessment Tool!</ceHeading3>
      <div class="mt-17.5">
        <ce-p>You’ve been added to an organisation:</ce-p>
        <ceHeading4 class="truncate-2 mt-4">
          {{ organisationName }}
        </ceHeading4>
      </div>
    </div>
    <div class="w-[137px] h-[216px]">
      <ce-image :src="image"></ce-image>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import { useOrganisation } from '@use/useOrganisation'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import CeImage from '~/components/atoms/CeImage.vue'

export default defineComponent({
  name: 'OnboardingIntroduceWelcome',
  components: {
    CeHeading3,
    CeHeading4,
    CeP,
    CeImage,
  },
  setup() {
    const image = ref(require(`~/assets/images/IntroductionWelcome.png`))
    const { getOrganisation } = useOrganisation()
    const organisationName = computed(
      () => getOrganisation.value?.organizationName
    )
    return {
      image,
      organisationName,
    }
  },
})
</script>
