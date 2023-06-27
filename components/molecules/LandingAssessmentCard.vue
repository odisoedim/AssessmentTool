<template>
  <div
    class="
      flex
      bg-white
      rounded-lg
      shadow-new-card
      ease-out
      transition-all
      hover:shadow-new-card-hover hover-child hover:-translate-y-1
      active:shadow-new-card-pressed active:translate-y-2
      h-[262px]
      overflow-hidden
    "
  >
    <div
      class="flex-none w-[253px] cursor-pointer card-left"
      @click="cardLeftClick"
    >
      <slot name="left" />
    </div>
    <div
      class="
        flex-none
        overflow-hidden
        transition-width
        duration-300
        ease-in-out
        z-10
        bg-white
        relative
      "
      :class="[isExpand ? 'w-[648px] opacity-100' : 'w-0 opacity-0']"
    >
      <div
        class="w-[648px] h-full absolute"
        :class="[isRightCard ? 'left-0' : 'right-0']"
      >
        <div class="h-full flex flex-col justify-center">
          <slot name="right" />
        </div>
        <div
          class="
            absolute
            right-0
            top-0
            w-9
            h-9
            bg-contain
            cursor-pointer
            card-close
          "
          :style="`background-image: url(${closeImage})`"
          @click="cardCloseClick"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LandingAssessmentCard',
  props: {
    isExpand: {
      type: Boolean,
      default: false,
    },
    isRightCard: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['expand', 'close'],
  setup(props, { emit }) {
    const closeImage = ref(require(`~/assets/images/LandingClose.png`))
    return {
      closeImage,
      cardLeftClick: () => {
        if (!props.isExpand) {
          emit('expand')
        }
      },
      cardCloseClick: () => {
        emit('close')
      },
    }
  },
})
</script>
