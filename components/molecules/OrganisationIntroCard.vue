<template>
  <div v-show="visible">
    <div class="relative">
      <div
        class="
          absolute
          z-0
          w-7.5
          h-7.5
          rotate-45
          shadow-normal
          rounded
          bg-white
        "
        :class="trianglePosition[position]"
      ></div>
      <div
        class="
          w-[390px]
          h-[350px]
          pl-8
          pr-6
          pt-6
          pb-7
          rounded-lg
          shadow-normal
          relative
          bg-white
        "
      >
        <div
          class="absolute z-2 w-7.5 h-7.5 rotate-45 rounded bg-white"
          :class="trianglePosition[position]"
        ></div>
        <div class="flex">
          <div>
            <ce-heading3 class="mt-10.5">{{ title }}</ce-heading3>
            <ce-heading5 class="mt-14">{{ subTitle }}</ce-heading5>
          </div>
          <div class="w-[91px] h-36 ml-8 mt-3">
            <ce-image :src="image"></ce-image>
          </div>
        </div>

        <ce-p class="mt-4">{{ content }}</ce-p>

        <ce-button class="-ml-4 -mb-2 mt-6" theme="tertiary" @click="close"
          >Got it!</ce-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import { useOrganisation } from '@use/useOrganisation'
import { useBoolean } from '~/composables'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeImage from '~/components/atoms/CeImage.vue'

export default defineComponent({
  name: 'OrganisationIntroCard',
  components: {
    CeHeading3,
    CeHeading5,
    CeButton,
    CeP,
    CeImage,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    position: {
      type: String as PropType<'left' | 'top'>,
      default: 'left',
    },
  },
  setup(props) {
    const { bool: visible, close, open } = useBoolean(false)
    const { currentOrganisation } = useOrganisation()
    onMounted(() => {
      const key = currentOrganisation.value + '_' + props.title
      const value = localStorage.getItem(key)
      if (!value) open()
    })
    const image = ref(require(`~/assets/images/organizationIntro.png`))
    const trianglePosition = ref({
      top: 'left-1/2 -translate-x-1/2 -top-3',
      left: 'top-1/2 -translate-y-1/2 -left-3',
    })
    return {
      visible,
      image,
      close: () => {
        const key = currentOrganisation.value + '_' + props.title
        localStorage.setItem(key, '1')
        close()
      },
      trianglePosition,
    }
  },
})
</script>
