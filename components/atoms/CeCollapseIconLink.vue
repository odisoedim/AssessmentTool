<template>
  <div>
    <div class="flex items-center align-center">
      <button class="static" @click="toggle">
        <ce-icon name="settings" />
      </button>

      <ce-button
        theme="tertiary"
        class="text-kh-grey"
        @click="handleSetOrganisation(+orgId)"
        >{{ title }}</ce-button
      >
    </div>

    <div
      v-show="value"
      class="rounded-b-lg py-[14px] px-[14px] shadow-normal relative top-[40px] bg-white ce-tabs-content z-10"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

// components
import CeIcon from '~/components/atoms/CeIcon.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import { useOrganisation } from '~/composables/useOrganisation'

// const
import { LINK_ASSESSMENT } from '~/constants/route'

export default defineComponent({
  name: 'CeCollapseIconLink',

  components: {
    CeIcon,
    CeButton,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    orgId: {
      type: Number,
      default: 0,
    },
  },

  emits: ['input', 'change'],
  setup(props, { emit }) {
    const { setOrganisation } = useOrganisation()
    const router = useRouter()
    const toggle = () => {
      emit('input', !props.value)
      emit('change', !props.value)
    }
    const handleSetOrganisation: (id: any) => void = (id) => {
      setOrganisation(id)
      router.push(LINK_ASSESSMENT)
    }

    return {
      toggle,
      handleSetOrganisation,
    }
  },
})
</script>
