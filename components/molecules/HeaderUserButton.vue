<template>
  <div class="h-9 w-9 rounded-full overflow-hidden cursor-pointer">
    <ce-image v-if="photoUrl && !imgError" :src="photoUrl" @error="open" />
    <p
      v-else
      class="
        uppercase
        w-full
        h-full
        bg-kh-yellow
        flex
        justify-center
        items-center
        font-medium font-Rubik
        text-kh-grey
      "
    >
      {{ letter }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import CeImage from '~/components/atoms/CeImage.vue'
import { useBoolean } from '~/composables'

export default defineComponent({
  name: 'HeaderUserButton',
  components: { CeImage },
  props: {
    photoUrl: {
      type: String,
      default: '',
    },
    firstName: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { bool: imgError, open } = useBoolean()
    const letter = computed(() => (props.firstName[0] || '').toUpperCase())
    return {
      imgError,
      open,
      letter,
    }
  },
})
</script>
