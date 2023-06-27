<template>
  <div class="w-152.5 relative">
    <OrganisationIntroCard
      v-if="onboard"
      class="absolute left-[630px] top-[-82px]"
      title="Almost ready!"
      sub-title="Before you can start..."
      content="Fill out information about your organisation. You won’t be able to begin an assessment until you’ve completed this information."
    />

    <ce-heading1>My organisation</ce-heading1>
    <div class="mt-6">
      <ce-p class="mb-4"
        >Please complete all the fields below. This information will help
        Circularity Assessment Tool offer more applicable assessments to your
        business or product, and will ensure more relevant results comparison.
      </ce-p>
      <CeWarningText v-if="invalidateNum">{{
        `There are ${invalidateNum} unanswered questions. Please complete all questions.`
      }}</CeWarningText>
    </div>

    <ce-heading2 class="mt-22">Profile</ce-heading2>

    <div class="my-14">
      <ProfileFormItem
        v-for="(value, key) in formData"
        :key="key"
        :title="value.title"
        :prompt="value.prompt"
        :valid="value.validationRule.valid"
        :error="value.validationRule.error"
        :prompt-disabled="key === 'industry' ? industryDisabled : false"
        class="mb-10"
      >
        <ce-input
          v-if="value.type === 'textarea'"
          v-model="value.value"
          type="textarea"
          :rows="key === 'organizationName' ? '1' : '5'"
          :is-error="!value.validationRule.valid"
        />
        <ce-small-text v-if="key === 'industry'" class="-mt-1 mb-4"
          >Answer previous question first</ce-small-text
        >
        <ce-select
          v-if="value.type === 'select'"
          v-model="value.value"
          class="w-[240px]"
          :is-error="!value.validationRule.valid"
          :options="value.options"
          :placeholder="value.placeholder"
          :disabled="key === 'industry' ? industryDisabled : false"
          @change="handleChange(key)"
        />
      </ProfileFormItem>
    </div>
    <ce-button
      v-if="!onboard"
      theme="secondary"
      class="mr-[374px]"
      @click.native="exit"
      >Exit</ce-button
    >
    <ce-button @click.native="save">{{
      onboard ? 'Submit' : 'Save'
    }}</ce-button>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watchEffect,
  Ref,
} from '@nuxtjs/composition-api'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeHeading2 from '~/components/atoms/CeHeading2.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import CeInput from '~/components/atoms/CeInput.vue'
import CeSelect from '~/components/atoms/CeSelect.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import CeWarningText from '~/components/atoms/CeWarningText.vue'
import ProfileFormItem from '~/components/molecules/ProfileFormItem.vue'
import {
  useInjectProfileData,
  useSaveProfileData,
} from '~/pages-helper/organisation/useOrganisationProfile'
import { useInjectEditBoolean } from '~/pages-helper/organisation/useEditBoolean'
import { useInjectOptions } from '~/pages-helper/organisation/useSelectOptions'
import { FormData } from '~/type/organisationProfile'
import OrganisationIntroCard from '~/components/molecules/OrganisationIntroCard.vue'
import { LINK_ORG_PROFILE } from '~/constants/route'

export default defineComponent({
  name: 'OrganisationProfileEdit',
  components: {
    OrganisationIntroCard,
    CeHeading1,
    CeHeading2,
    CeP,
    CeButton,
    CeInput,
    CeSelect,
    CeWarningText,
    ProfileFormItem,
    CeSmallText,
  },
  props: {
    onboard: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { update } = useSaveProfileData()
    const { close } = useInjectEditBoolean()
    const { formFillData } = useInjectProfileData()
    const options = useInjectOptions()
    const {
      genYearOptions,
      profileOptions,
      rowSectorOptions,
      rowIndustryOptions,
    } = options
    const yearOptions = genYearOptions()
    const sectorOptions = computed(() => {
      const _options: { value: string | number; name: string }[] = []
      rowSectorOptions.value?.forEach(
        (item: { name: string; id: number | string }) => {
          _options.push({ name: item.name, value: +item.id })
        }
      )
      return _options
    })

    const revenueOption = computed(() => profileOptions.value.revenueOption)
    const employeesOption = computed(() => profileOptions.value.employeesOption)

    const industryOptions = computed(() => {
      const _sector = formData.value.sector.value
      return (rowIndustryOptions.value[_sector] || []).map((item) => {
        return { name: item.name, value: +item.id }
      })
    })

    const formData: Ref<FormData> = ref({
      organizationName: {
        type: 'textarea',
        title: "What is your organisation's full trading name?",
        value: '',
        prompt: 'Type in the name of your organisation',
        validationRule: {
          valid: true,
          length: { min: 2, max: 60 },
          error:
            'Please type text size between a minimum of 2 characters and a maximum of 60 characters',
        },
      },
      foundedYear: {
        type: 'select',
        options: yearOptions,
        title: 'In which year was your organisation established?',
        value: '',
        placeholder: 'Year',
        prompt: 'Select the year',
        validationRule: {
          valid: true,
          length: { min: 1 },
          error: 'Please select the year',
        },
      },
      companyDescribe: {
        type: 'textarea',
        title: 'Briefly describe what your organisation does',
        value: '',
        prompt:
          'Type a description for your organisation. Maximum 350 characters',
        validationRule: {
          valid: true,
          length: { min: 10, max: 350 },
          error:
            'Please type text size between a minimum of 10 characters and a maximum of 350 characters',
        },
      },
      sector: {
        type: 'select',
        options: sectorOptions,
        title: 'Which sector does your organisation belong to?',
        value: '',
        placeholder: 'Sector',
        prompt: 'Select the sector',
        validationRule: {
          valid: true,
          length: { min: 1 },
          error: 'Please select the sector',
        },
      },
      industry: {
        type: 'select',
        options: industryOptions,
        title: 'Which industry does your organisation belong to?',
        value: '',
        placeholder: 'Industry',
        prompt: 'Select the industry',
        validationRule: {
          valid: true,
          length: { min: 1 },
          error: 'Please select the industry',
        },
      },
      annualTurnover: {
        type: 'select',
        options: revenueOption,
        title: 'What is your annual turnover / revenue in EUR?',
        value: '',
        placeholder: 'Revenue',
        prompt: 'Select the yearly revenue range',
        validationRule: {
          valid: true,
          length: { min: 1 },
          error: 'Please select the yearly revenue range',
        },
      },
      employeesNumber: {
        type: 'select',
        options: employeesOption,
        title: 'How many employees do you have?',
        value: '',
        placeholder: 'Employees',
        prompt: 'Select the range of employees',
        validationRule: {
          valid: true,
          length: { min: 1 },
          error:
            'Please select the range of employees that work for your organisation',
        },
      },
    })
    const industryDisabled = computed(
      () => Object.keys(industryOptions.value).length === 0
    )
    watchEffect(() => {
      if (formFillData && Object.keys(formFillData.value || {}).length) {
        Object.keys(formData.value).forEach((item) => {
          if (formFillData.value[item])
            formData.value[item].value = formFillData.value[item]
        })
      }
    })
    const handleChange = (key: string) => {
      if (key === 'sector') {
        formData.value.industry.value = ''
      }
    }
    const validateLength = (
      data: Ref<FormData>,
      itemName: string,
      min: number = 0,
      max: number = Infinity
    ) => {
      if (
        (data.value[itemName].value + '').length < min ||
        (data.value[itemName].value + '').length > max
      ) {
        data.value[itemName].validationRule.valid = false
        return
      }
      data.value[itemName].validationRule.valid = true
    }

    const invalidateNum = computed(() => {
      let _num = 0
      Object.values(formData.value).forEach((item) => {
        if (!item.validationRule.valid) {
          ++_num
        }
      })
      return _num
    })

    const validate = () => {
      const _keys = Object.keys(formData.value)
      _keys.forEach((item) => {
        validateLength(
          formData,
          item,
          formData.value[item].validationRule.length.min,
          formData.value[item].validationRule.length?.max
        )
      })
      return invalidateNum.value !== 0
    }

    const exit = () => {
      close && close()
    }
    const dataForSaving = computed(() => {
      const _result: {
        organizationName: string
        companyName: string
        foundedYear: number
        companyDescribe: string
        sector: number
        industry: number
        annualTurnover: number
        employeesNumber: number
        [key: string]: number | string
      } = {
        organizationName: '',
        companyName: '',
        foundedYear: 0,
        companyDescribe: '',
        sector: 0,
        industry: 0,
        annualTurnover: 0,
        employeesNumber: 0,
      }
      Object.keys(formData.value).forEach((item) => {
        _result[item] = formData.value[item].value
      })
      return _result
    })
    const save = async () => {
      if (validate()) return
      try {
        await update(dataForSaving.value)
      } catch (e) {
        alert('save failed')
        return
      }
      location.href = location.origin + LINK_ORG_PROFILE
    }
    return {
      exit,
      save,
      handleChange,
      invalidateNum,
      profileOptions,
      sectorOptions,
      industryOptions,
      rowSectorOptions,
      rowIndustryOptions,
      yearOptions,
      formData,
      industryDisabled,
      dataForSaving,
    }
  },
})
</script>
