<template>
  <header class="h-16.5 shadow-header flex items-center">
    <div
      class="w-[1032px] h-full mx-auto my-0 flex items-center px-4 box-content justify-between relative"
    >
      <div class="flex w-full h-full items-center">
        <ce-logo class="mr-8" />
        <HeaderOrganization v-if="result && !isAssessmentOrganisationsPage" />
        <HeaderTabs v-if="false" />
        <HeaderUser class="absolute right-4 top-0 h-full flex items-center" />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, useRoute } from '@nuxtjs/composition-api'

// hooks
import { useUserinfo } from '@use/useUserinfo'

// components
import CeLogo from '~/components/atoms/CeLogo.vue'
import HeaderUser from '~/components/organisms/HeaderUser.vue'
import HeaderOrganization from '~/components/organisms/HeaderOrganization.vue'
import HeaderTabs from '~/components/organisms/HeaderTabs.vue'

export default defineComponent({
  name: 'AppHeader',
  components: {
    HeaderTabs,
    HeaderOrganization,
    HeaderUser,
    CeLogo,
  },
  setup() {
    const { result } = useUserinfo()
    const route = useRoute()

    const isAssessmentOrganisationsPage = computed(() => {
      const getRouteName = route.value.name
      return getRouteName === 'assessment-organisations'
    })

    return {
      result,
      isAssessmentOrganisationsPage,
    }
  },
})
</script>
