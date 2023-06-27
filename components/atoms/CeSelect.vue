<template>
  <div
    class="relative"
    tabindex="0"
    @blur="closeBox"
    @keydown.enter="handleSelect"
    @keydown.space="handleSelect"
    @keydown.down.prevent="handleNavigate('next')"
    @keydown.up.prevent="handleNavigate('prev')"
  >
    <div
      class="border rounded-lg pt-2.75 pb-2.25 pl-4 pr-1 select-box__input"
      :class="[
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        isError ? 'border-kh-red' : 'border-kh-grey-200',
      ]"
      @click="showOption"
    >
      <div
        class="flex items-center justify-between"
        :class="
          disabled
            ? 'text-kh-grey-200'
            : handleName.length && !selectVisible
            ? 'text-kh-grey-300'
            : 'text-kh-primary'
        "
      >
        <p
          class="font-NotoSans text-base font-normal leading-6 tracking-02 truncate"
        >
          {{ selectVisible ? 'Select' : handleName || placeholder }}
        </p>
        <CeIcon
          :name="selectVisible ? 'chevron-up' : 'chevron-down'"
          class="flex-none"
        />
      </div>
    </div>
    <div
      v-show="selectVisible"
      class="mt-0.5 left-0 right-0 z-10 py-4 bg-white absolute border rounded-lg overflow-hidden shadow-normal select-box__options border-kh-grey-200"
    >
      <div
        ref="scrollBarRef"
        class="overflow-y-auto"
        :style="{ 'max-height': dropdownMaxHeight }"
      >
        <div class="relative px-4">
          <label
            v-for="(item, index) in options"
            :key="item.value"
            ref="optionRef"
            class="py-0.5 px-1 mb-1 font-NotoSans text-base font-normal leading-6 tracking-02 w-full flex items-start cursor-pointer"
            :class="{
              'bg-kh-primary-100': isPressed && hoverIndex === index,
              'bg-kh-primary-50': showHover && hoverIndex === index,
              'hover:bg-kh-primary-50': !isPressed,
            }"
            @mouseover="handleHover(index)"
            @mousedown="handleMousedown"
            @mouseup="handleMouseup"
          >
            <ce-radio
              v-model="value_"
              control
              stop-active
              tabindex
              :name="item.value || ''"
              class="mr-3 flex-none"
            />
            {{ item.name }}</label
          >
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  computed,
  nextTick,
} from '@nuxtjs/composition-api'
import CeIcon from '~/components/atoms/CeIcon.vue'
import CeRadio from '~/components/atoms/CeRadio.vue'

export default defineComponent({
  name: 'CeSelect',
  components: {
    CeIcon,
    CeRadio,
  },
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    options: {
      type: Array as PropType<{ name: string; value: string | number }[]>,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Select',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    dropdownMaxHeight: {
      type: String,
      default: '342px',
    },
  },
  emits: ['input', 'change'],
  setup(props, { emit }) {
    const scrollBarRef = ref<HTMLDivElement>()
    const optionRef = ref<HTMLLabelElement[]>()
    const value_ = computed({
      get: () => {
        return props.value
      },
      set: (v) => {
        emit('change', v)
        emit('input', v)
      },
    })
    const hoverIndex = ref(-1)
    const showHover = ref(false)
    const isPressed = ref(false)
    const selectVisible = ref(false)
    const openBox = () => {
      selectVisible.value = true
      let activatedIndex = 0
      scrollToView(value_.value, true)
      activatedIndex = props.options.findIndex(
        (item) => item.value === value_.value
      )
      hoverIndex.value = activatedIndex
    }

    const closeBox = () => {
      selectVisible.value = false
    }
    const showOption = () => {
      if (props.disabled) return
      selectVisible.value ? closeBox() : openBox()
    }

    const handleSelect = () => {
      if (!selectVisible.value) {
        openBox()
        return
      }
      const activatedIndex = props.options.findIndex(
        (item) => item.value === value_.value
      )
      if (activatedIndex === hoverIndex.value) {
        closeBox()
        return
      }
      value_.value = props.options[hoverIndex.value].value
      closeBox()
    }

    const handleNavigate = (position: string) => {
      showHover.value = true
      selectVisible.value || openBox()
      if (position === 'next') {
        hoverIndex.value = ++hoverIndex.value % props.options.length
      } else {
        hoverIndex.value =
          hoverIndex.value <= 0
            ? props.options.length - 1
            : --hoverIndex.value % props.options.length
      }
      scrollToView(props.options[hoverIndex.value].value)
    }

    const scrollToView = (option: string | number, top: boolean = false) => {
      const activatedIndex = computed(() => {
        const _index = props.options.findIndex((item) => item.value === option)
        return _index === -1 ? 0 : _index
      })
      nextTick(() => {
        if (
          optionRef.value![activatedIndex.value].offsetTop <
            scrollBarRef.value!.scrollTop ||
          top === true
        ) {
          scrollBarRef.value!.scrollTop =
            optionRef.value![activatedIndex.value].offsetTop
        }
        if (
          optionRef.value![activatedIndex.value].offsetTop +
            optionRef.value![activatedIndex.value].clientHeight >
          scrollBarRef.value!.clientHeight + scrollBarRef.value!.scrollTop
        ) {
          scrollBarRef.value!.scrollTop =
            optionRef.value![activatedIndex.value].offsetTop -
            scrollBarRef.value!.clientHeight +
            optionRef.value![activatedIndex.value].clientHeight
        }
      })
    }
    const handleName = computed(() => {
      const mapOptions = new Map()
      props.options.forEach((item) => {
        mapOptions.set(item.value, item.name)
      })
      return mapOptions.get(value_.value) || ''
    })
    const handleHover = (index: number) => {
      showHover.value = false
      hoverIndex.value = index
    }
    const handleMousedown = () => {
      isPressed.value = true
    }
    const handleMouseup = () => {
      isPressed.value = false
      closeBox()
    }
    return {
      value_,
      handleName,
      selectVisible,
      handleSelect,
      closeBox,
      showOption,
      handleNavigate,
      hoverIndex,
      showHover,
      handleHover,
      optionRef,
      scrollBarRef,
      isPressed,
      handleMousedown,
      handleMouseup,
    }
  },
})
</script>
