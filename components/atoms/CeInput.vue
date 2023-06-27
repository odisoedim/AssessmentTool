<template>
  <div>
    <template v-if="type !== 'textarea'">
      <div v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        v-model="value_"
        :type="type"
        class="p-4 ce-input__placeholder rounded-lg border w-full"
        :class="isError ? 'border-kh-red' : 'border-kh-grey-200'"
        :placeholder="placeholder"
        v-bind="$attrs"
      />
      <div v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      v-model="value_"
      class="p-4 ce-input__placeholder rounded-lg border border-kh-grey-200 w-full"
      :class="isError ? 'border-kh-red' : 'border-kh-grey-200'"
      :placeholder="placeholder"
      :rows="rows"
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useModel } from '@use/useModel'

export default defineComponent({
  name: 'CeInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    rows: {
      type: String,
      default: '7',
    },
    placeholder: {
      type: String,
      default: 'Type your text here',
    },
    isError: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const value_ = useModel(
      () => props.value,
      (v) => emit('input', v)
    )
    return {
      value_,
    }
  },
})
</script>

<style scoped>
.ce-input__placeholder::placeholder {
  font-family: 'NotoSans', serif;
  font-style: italic;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.03em;
}
</style>
