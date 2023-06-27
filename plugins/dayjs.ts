import { defineNuxtPlugin, onGlobalSetup } from '@nuxtjs/composition-api'
import { provideDayjs } from '@use/useDayjs'

export default defineNuxtPlugin(({ app }) =>
  onGlobalSetup(() => provideDayjs(app.$dayjs))
)
