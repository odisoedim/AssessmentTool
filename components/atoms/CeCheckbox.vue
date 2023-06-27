<template>
  <span
    class="
      inline-flex
      justify-center
      items-center
      border-2
      h-8
      w-8
      align-middle
      rounded-lg
    "
    :class="[
      {
        [`focus-visible:ring-kh-primary focus-visible:ring-opacity-50 cursor-pointer`]:
          control,
      },
      active
        ? `bg-kh-primary border-kh-primary shadow-checked`
        : `bg-transparent border-kh-grey-200`,
    ]"
    :tabindex="control ? tabindex : -1"
    @keydown.enter="onActive"
    @keydown.space="onActive"
    @click="onActive"
  >
    <ce-icon
      :class="active ? '' : 'invisible'"
      name="check"
      theme="white"
      :size="32 / 36"
    ></ce-icon>
    <input
      v-model="arr"
      v-bind="$attrs"
      :value="name"
      type="checkbox"
      class="invisible absolute w-0 h-0"
    />
  </span>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'
import { useModel } from '@use/useModel'
import CeIcon from '~/components/atoms/CeIcon.vue'

export default defineComponent({
  name: 'CeCheckbox',
  components: { CeIcon },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Array as PropType<string[]>,
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
  },
  emits: ['input', 'change'],
  setup(props, { emit }) {
    const arr = useModel(
      () => props.value,
      (v) => emit('input', v)
    )
    const active = computed(() => arr.value.includes(props.name))

    const onActive = (e: Event) => {
      if (!props.control) {
        return
      }
      const _arr = [...arr.value]
      if (active.value) {
        const index = _arr.findIndex((i) => i === props.name)
        _arr.splice(index, 1)
      } else {
        _arr.push(props.name)
      }
      arr.value = [..._arr]
      emit('change', e)
    }
    return {
      arr,
      active,
      onActive,
    }
  },
})
</script>
