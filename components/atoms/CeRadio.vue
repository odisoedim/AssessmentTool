<template>
  <span
    class="h-6 w-6 rounded-full border-2 border-kh-primary bg-white flex justify-center items-center relative ce-radio"
    :tabindex="control ? tabindex : -1"
    :class="[
      {
        [`cursor-pointer`]: control,
        ['shadow-circle-out']: active,
      },
    ]"
    @keydown.enter="onActive"
    @keydown.space="onActive"
    @click="onActive"
  >
    <input
      v-bind="$attrs"
      :id="radioId"
      v-model="value_"
      type="radio"
      :value="name"
      class="invisible absolute w-0 h-0"
    />
    <span
      class="block rounded-full bg-kh-primary transition-all duration-200 ease-in"
      :class="[active ? 'w-3 h-3' : 'w-0 h-0']"
    ></span>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useModel } from '@use/useModel'

export default defineComponent({
  name: 'CeRadio',
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    control: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: [Number, String],
      default: -1,
    },
    radioId: {
      type: String,
      default: '',
    },
    stopActive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input', 'change'],
  setup(props, { emit }) {
    const value_ = useModel(
      () => props.value,
      (v) => emit('input', v)
    )
    const active = computed(() => value_.value === props.name)
    return {
      value_,
      active,
      onActive(e: Event) {
        if (!props.control || props.stopActive) {
          return
        }
        value_.value = props.name
        emit('change', e)
      },
    }
  },
})
</script>
