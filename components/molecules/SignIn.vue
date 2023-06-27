<template>
  <ce-button theme="secondary" @click="SignIn"> Sign in/Sign up </ce-button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeButton from '~/components/atoms/CeButton.vue'
import { gotoLogin } from '~/util/auth'

export default defineComponent({
  name: 'SignIn',
  components: { CeButton },
  setup() {
    return {
      SignIn: () => gotoLogin(true),
    }
  },
})
</script>
