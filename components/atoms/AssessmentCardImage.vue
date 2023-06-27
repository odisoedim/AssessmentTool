<template>
  <div class="w-[484px] h-[188px] relative">
    <ce-skeleton v-if="loading" class="h-full w-full" />
    <template v-else>
      <ce-image class="h-full" :src="assessmentImg"></ce-image>
      <div
        class="
          absolute
          bottom-0
          left-0
          w-full
          h-2/5
          bg-gradient-to-t
          from-kh-grey-transparent-100
          assessment-card-modal
        "
      ></div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import CeSkeleton from '~/components/atoms/CeSkeleton.vue'
import CeImage from '~/components/atoms/CeImage.vue'
export default defineComponent({
  name: 'AssessmentCardImage',
  components: { CeSkeleton, CeImage },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const assessmentImg = computed(() =>  props.src)
    return {
      assessmentImg,
    }
  },
})
</script>
