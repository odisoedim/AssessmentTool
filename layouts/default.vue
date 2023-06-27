<template>
  <div>
    <app-header />
    <main>
      <nuxt />
        <code hidden>{{ env }}</code>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AppHeader from '~/components/templates/AppHeader.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: { AppHeader },
  setup: (() => {
    return {
      env: process.env.ENV_VERSION! + process.env.STRAPI_GRAPHQL!
    }
  })
})
</script>
