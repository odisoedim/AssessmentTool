<template>
  <component
    :is="rootType"
    :class="classList"
    class="px-4 py-2 h-10 inline-flex items-center border border-transparent font-bold font-NotoSans rounded tracking-2px disabled:text-kh-grey-200 disabled:cursor-not-allowed disabled:shadow-none relative box-border shadow-normal active:shadow-none"
    :disabled="$attrs.disabled"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <ce-icon
      v-if="leftIcon"
      :name="leftIcon"
      :stroke-width="strokeWidth"
      :without-padding="withoutPadding"
      class="absolute top-1/2 -translate-y-2/4 left-2 text-current"
    />
    <span class="text-sm leading-6 inline-block" :class="svgGap">
      <slot />
    </span>
    <ce-icon
      v-if="rightIcon"
      :name="rightIcon"
      :stroke-width="strokeWidth"
      :without-padding="withoutPadding"
      class="absolute top-1/2 -translate-y-2/4 right-2 text-current"
    />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { ButtonVariant } from '~/type/buttonVariant'
import CeIcon from '~/components/atoms/CeIcon.vue'

export default defineComponent({
  name: 'CeButton',
  components: {
    CeIcon,
  },
  inheritAttrs: false,
  props: {
    theme: {
      type: String as PropType<ButtonVariant>,
      validator: (val: ButtonVariant) => {
        return [...Object.values(ButtonVariant)].includes(val)
      },
      default: 'primary',
    },
    leftIcon: {
      type: String,
      default: '',
    },
    rightIcon: {
      type: String,
      default: '',
    },
    withoutPadding: {
      type: Boolean,
      default: false,
    },
    strokeWidth: {
      type: Number,
      default: 2,
    },
    shadow: {
      type: Boolean,
      default: true,
    },
    customColor: {
      type: Boolean,
      default: false,
    },
    rootType: {
      type: String as PropType<'button' | 'nuxt-link' | 'a'>,
      default: 'button',
      validator: (value: string) => {
        return ['button', 'nuxt-link', 'a'].includes(value)
      },
    },
  },
  setup(props) {
    const typeNameList: Record<ButtonVariant, string> = {
      primary:
        'bg-kh-primary hover:bg-kh-primary-200 hover:shadow-normal-hover active:bg-kh-primary-400 disabled:bg-kh-grey-100',
      secondary:
        'bg-white border-kh-primary hover:bg-kh-primary-50 hover:shadow-normal-hover active:bg-kh-primary-100 disabled:border-kh-grey-200 disabled:bg-transparent',
      tertiary: 'bg-transparent shadow-none',
      yellow:
        'bg-kh-yellow shadow-yellow hover:bg-kh-yellow-50 hover:shadow-yellow-hover active:bg-kh-yellow active:shadow-none',
    }
    const textColorList: Record<ButtonVariant, string> = {
      primary: 'text-white',
      secondary: 'text-kh-grey',
      tertiary:
        'text-kh-primary hover:text-kh-primary-200 active:text-kh-primary-400 ',
      yellow: 'text-kh-grey',
    }
    const svgGap = computed(() => {
      if (props.leftIcon) return 'pl-7.5'
      if (props.rightIcon) return 'pr-7.5'
      return ''
    })
    const className = computed(() => {
      return typeNameList[props.theme]
    })
    const textClass = computed(() => {
      if (props.theme === ButtonVariant.Tertiary && props.customColor) {
        return ''
      } else {
        return textColorList[props.theme]
      }
    })
    const btnShadow = computed(() => {
      return props.shadow ? '' : 'shadow-none'
    })

    const classList = computed(() => {
      return [className.value, textClass.value, btnShadow.value].join(' ')
    })
    return {
      classList,
      svgGap,
    }
  },
})
</script>
