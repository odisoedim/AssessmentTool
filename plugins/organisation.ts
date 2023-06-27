import { defineNuxtPlugin, onGlobalSetup } from '@nuxtjs/composition-api'
import { provideOrganisation } from '@use/useOrganisation'

export default defineNuxtPlugin(() => {
  onGlobalSetup(() => provideOrganisation())
})
