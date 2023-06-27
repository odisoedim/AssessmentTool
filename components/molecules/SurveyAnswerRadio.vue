<template>
  <div class="relative inline-block h-6 w-6 hover-radio hover:text-kh-primary">
    <ce-radio
      v-model="value_"
      :radio-id="`answer_${index}`"
      :name="index + ''"
      control
      tabindex="0"
    />
    <label
      :for="`answer_${index}`"
      class="
        text-center
        absolute
        top-12
        left-1/2
        transform
        -translate-x-1/2
        w-[120px]
        cursor-pointer
      "
    >
      <ce-heading5 v-if="active" class="text-kh-primary">
        {{ text }}
      </ce-heading5>
      <ce-p v-else>
        {{ text }}
      </ce-p>
    </label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useModel } from '@use/useModel'
import CeRadio from '~/components/atoms/CeRadio.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import CeP from '~/components/atoms/CeP.vue'

export default defineComponent({
  name: 'SurveyAnswerRadio',
  components: { CeP, CeHeading5, CeRadio },
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
