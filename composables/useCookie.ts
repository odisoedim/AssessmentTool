import { NuxtCookies } from 'cookie-universal-nuxt'
import { inject, InjectionKey, provide } from '@nuxtjs/composition-api'

export const cookieSymbol: InjectionKey<NuxtCookies> = Symbol('nuxt-cookies')
export const provideCookie = (nuxtCookies: NuxtCookies) => {
  provide(cookieSymbol, nuxtCookies)
}

export const useCookies = () => {
  const nuxtCookies = inject(cookieSymbol)
  if (!nuxtCookies) throw new Error('inject nuxtCookies failed')
  return nuxtCookies
}
