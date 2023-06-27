<template>
  <div
    class="
      p-3
      bg-white
      flex
      items-center
      rounded-lg
      cursor-pointer
      hover-child
      shadow-new-card
      ease-out
      transition-all
      hover:shadow-new-card-hover hover-child hover:-translate-y-1
      active:shadow-new-card-pressed active:translate-y-2
    "
    tabindex="0"
    @keydown.enter="onActive"
    @keydown.space="onActive"
    @click="onActive"
  >
    <ce-checkbox v-model="valueArr" class="fake-hover" :name="name" />
    <ce-heading5 class="ml-3">{{ name }}</ce-heading5>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { useModel } from '@use/useModel'
import CeCheckbox from '~/components/atoms/CeCheckbox.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'

export default defineComponent({
  name: 'SurveyChallengesCheckbox',
  components: { CeHeading5, CeCheckbox },
  props: {
    value: {
      type: Array as PropType<string[]>,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const valueArr = useModel(
      () => props.value,
      (v) => emit('input', v)
    )
    return {
      valueArr,
      onActive() {
        const _arr = [...valueArr.value]
        const index = _arr.findIndex((i) => i === props.name + '')
        if (index > -1) {
          _arr.splice(index, 1)
        } else {
          _arr.push(props.name)
        }
        valueArr.value = [..._arr]
      },
    }
  },
})
</script>

<style scoped>
.hover-child:hover .fake-hover {
  border-color: #593ccf;
}
</style>
