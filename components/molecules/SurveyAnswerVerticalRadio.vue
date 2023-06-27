<template>
  <div
    class="p-3 bg-white h-14 flex items-center rounded-lg cursor-pointer hover-child shadow-new-card ease-out transition-all hover:shadow-new-card-hover hover-child hover:-translate-y-1 active:shadow-new-card-pressed active:translate-y-2"
  >
    <ce-radio
      v-model="value_"
      :radio-id="`answer_${index}`"
      :name="index + ''"
      control
      tabindex="0"
    />
    <ce-heading5 class="ml-3" :class="active ? 'text-kh-primary' : ''">
      {{ text }}
    </ce-heading5>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useModel } from '@use/useModel'
import CeRadio from '~/components/atoms/CeRadio.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'

export default defineComponent({
  name: 'SurveyAnswerRadio',
  components: { CeHeading5, CeRadio },
  props: {
    value: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const value_ = useModel(
      () => props.value,
      (v) => emit('input', v)
    )
    const active = computed(() => props.value + '' === props.index + '')
    return {
      value_,
      active,
    }
  },
})
</script>

<style scoped>
.hover-radio:hover .ce-radio {
  box-shadow: 0 0 8px rgba(38, 50, 56, 0.3);
}
.hover-radio:active .ce-radio {
  box-shadow: none;
}
</style>
