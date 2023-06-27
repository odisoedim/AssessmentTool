import { defineNuxtPlugin, onGlobalSetup } from '@nuxtjs/composition-api'
import { provideUserinfo } from '@use/useUserinfo'

export default defineNuxtPlugin(() => {
  onGlobalSetup(() => provideUserinfo())
})
