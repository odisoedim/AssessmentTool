import { defineNuxtPlugin, onGlobalSetup } from '@nuxtjs/composition-api'
import { provideCookie } from '@use/useCookie'

export default defineNuxtPlugin(({ app }) =>
  onGlobalSetup(() => provideCookie(app.$cookies))
)
