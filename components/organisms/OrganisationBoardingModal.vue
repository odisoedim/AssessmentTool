<template>
  <ce-modal value :show-header="false" top="125px" width="638px" height="436px">
    <client-only>
      <div class="pt-10.75 px-16.5">
        <OrganisationBoardingWelcome
          v-show="step === Step.welcome"
          @next="() => setStep(Step.start)"
        />
        <OrganisationBoardingStart
          v-show="step === Step.start"
          v-model="value"
          :options="options"
          @add="() => setStep(Step.add)"
        />
        <OrganisationBoardingAddNew
          v-show="step === Step.add"
          @back="() => setStep(Step.start)"
        />
      </div>
    </client-only>
  </ce-modal>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  computed,
  onMounted,
  watchEffect,
} from '@nuxtjs/composition-api'
import CeModal from '~/components/molecules/CeModal.vue'
import { useRequest } from '~/composables'
import OrganisationBoardingWelcome from '~/components/molecules/OrganisationBoardingWelcome.vue'
import OrganisationBoardingStart from '~/components/molecules/OrganisationBoardingStart.vue'
import { useFetchOrganisations } from '~/api/organisation'
import { ONBOARDING_FIND_ORG } from '~/util/static'
import OrganisationBoardingAddNew from '~/components/molecules/OrganisationBoardingAddNew.vue'
enum Step {
  welcome,
  start,
  add,
}
export default defineComponent({
  name: 'OrganisationBoardingModal',
  components: {
    OrganisationBoardingAddNew,
    OrganisationBoardingStart,
    OrganisationBoardingWelcome,
    CeModal,
  },
  setup() {
    const step = ref(Step.welcome)
    const setStep = (_step: Step) => (step.value = _step)
    const fetchOrg = useFetchOrganisations()
    const { result } = useRequest(async () => {
      const { data, error } = await fetchOrg({ ids: [] })
      /* istanbul ignore next */
      if (error) throw error
      return data
    })
    const options = computed(
      () =>
        // [
        //   {
        //     name: 'Not Found',
        //     value: '',
        //   },
        // ].concat(
        // )
        result.value?.organisations.map(({ orgId, orgName }) => ({
          name: orgName,
          value: orgId + '',
        })) || []
    )
    const value = ref('')
    onMounted(() => {
      value.value = localStorage.getItem(ONBOARDING_FIND_ORG) || ''
    })
    watchEffect(() => {
      if (value.value) {
        localStorage.setItem(ONBOARDING_FIND_ORG, value.value)
        step.value = Step.start
      }
    })
    return { step, setStep, options, value, Step }
  },
})
</script>
