<template>
  <div>
    <ce-heading3>To get started...</ce-heading3>
    <ce-p class="w-[380px] mb-8 mt-2"
      >Join an organisation already registered in Circularity Assessment Tool or add your
      organisation.</ce-p
    >
    <ce-small-text class="mb-4">Find your organisation</ce-small-text>
    <ce-select
      v-model="value_"
      class="w-60 z-10"
      placeholder="Organisation"
      :options="options"
      dropdown-max-height="124px"
    />
    <div class="mt-4 mb-8 h-13 flex items-center -ml-2.5">
      <template v-if="value">
        <div class="w-9 ml-1.5 mr-1">
          <ce-icon name="alert-triangle"></ce-icon>
        </div>
        <div class="w-[308px]">
          <ce-p
            >Contact your Circle Lab account admin to be added to this
            organisation</ce-p
          >
        </div>
      </template>
    </div>
    <ce-button @click="() => $emit('add')">Add new organisation</ce-button>
    <div class="h-[136px] w-[117px] absolute right-[90px] bottom-[75px]">
      <ce-image :src="cat"></ce-image>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import CeSelect from '~/components/atoms/CeSelect.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import CeIcon from '~/components/atoms/CeIcon.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import { useModel } from '~/composables/useModel'

export default defineComponent({
  name: 'OrganisationBoardingStart',
  components: {
    CeImage,
    CeIcon,
    CeButton,
    CeSelect,
    CeSmallText,
    CeP,
    CeHeading3,
  },
  props: {
    options: {
      type: Array as PropType<{ name: string; value: string }[]>,
      default: () => [],
    },
    value: {
      type: String,
      required: true,
    },
  },
  emit: ['input', 'add'],
  setup(props, { emit }) {
    const cat = require('~/assets/images/cat.png')
    const value_ = useModel(
      () => props.value,
      (v) => emit('input', v)
    )
    return { value_, cat }
  },
})
</script>
