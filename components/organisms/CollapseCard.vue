<template>
  <div><slot /></div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  provide,
  PropType,
} from '@nuxtjs/composition-api'
 
export default defineComponent({
  name: 'CollapseCard',
  components: {},
  props: {
    value: {
      type: Array as PropType<(string | number)[]>,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const activeNames = ref<(string | number)[]>([])
    activeNames.value = props.value
    watch(
      () => props.value,
      (v) => {
        activeNames.value = v
      }
    )
    const setActiveNames = (names: (string | number)[]) => {
      emit('input', names)
      emit('change', names)
    }

    const handleItemClick: (name: string | number) => void = (name) => {
      const activeArr = activeNames.value.slice(0)

      const index = activeArr.indexOf(name)
      if (index > -1) {
        activeArr.splice(index, 1)
      } else {
        activeArr.push(name)
      }
      setActiveNames(activeArr)
    }

    provide('activeNames', activeNames)
    provide('handleItemClick', handleItemClick)
    return {
      handleItemClick,
    }
  },
})
</script>
