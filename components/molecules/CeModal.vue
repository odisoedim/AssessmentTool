<template>
  <div>
    <transition name="modal">
      <ce-overlay
        v-show="visible"
        class="transition-opacity"
        :z-index="zIndex"
        @click.native="onOverLay"
      />
    </transition>
    <div
      v-if="visible"
      :style="style"
      :class="modalClass"
      class="
        transition-opacity
        fixed
        left-1/2
        -translate-x-1/2
        bg-white
        rounded-lg
        overflow-hidden
        shadow-modal
        flex flex-col
        ce-modal__modal
      "
    >
      <div
        v-if="showHeader"
        class="
          bg-kh-primary
          text-white
          relative
          min-h-2.5
          rounded-tl-lg rounded-tr-lg
          pl-4
          pr-12
          py-2
          ce-modal__header
        "
      >
        <slot name="header"></slot>
        <ce-icon
          name="x-close"
          class="absolute right-0 top-0.5 cursor-pointer"
          theme="white"
          @click.native="close"
        />
      </div>
      <div
        class="
          bg-white
          rounded-bl-lg rounded-br-lg
          flex-1
          ce-modal__content
          overflow-y-auto
        "
      >
        <slot></slot>
      </div>
      <ce-icon
        v-if="!showHeader && closeByIcon"
        name="x-close"
        class="
          absolute
          right-0
          top-0
          cursor-pointer
          ce-modal__close
          hover:text-kh-primary
          active:text-kh-primary-400
        "
        @click.native="close"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onUnmounted,
  watchEffect,
} from '@nuxtjs/composition-api'
import { useModel } from '@use/useModel'
import { useSize } from '@use/useSize'
import CeOverlay from '~/components/atoms/CeOverlay.vue'
import CeIcon from '~/components/atoms/CeIcon.vue'
import { useBooleanWrap } from '~/composables'
import { transCssSize } from '~/util/cssSize'
import { toggleBodyOverflow } from '~/util/globalStyle'

export default defineComponent({
  name: 'CeModal',
  components: { CeIcon, CeOverlay },
  props: {
    closeByIcon: {
      type: Boolean,
      default: false,
    },
    closeByOverlay: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    modalClass: {
      type: String,
      default: '',
    },
    zIndex: {
      type: Number,
      default: 9000,
    },
    value: {
      type: Boolean,
      required: true,
    },
    width: {
      type: [String, Number],
      default: 600,
    },
    height: {
      type: [String, Number],
      default: 400,
    },
    top: {
      type: [String, Number],
      default: '50px',
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const { bool: visible, close } = useBooleanWrap(
      useModel(
        () => props.value,
        (v) => emit('input', v)
      )
    )

    watchEffect(() => process.client && toggleBodyOverflow(visible.value))
    onUnmounted(() => toggleBodyOverflow(false))

    const sizeStyle = useSize(props)
    const style = computed(() => {
      const zIndex = props.zIndex + 1
      return {
        ...sizeStyle.value,
        zIndex,
        top: transCssSize(props.top),
      }
    })
    const onOverLay = () => {
      props.closeByOverlay && close()
    }
    return {
      visible,
      style,
      close,
      onOverLay,
    }
  },
})
</script>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}
.modal-enter,
.modal-leave-active {
  opacity: 0;
}
</style>
