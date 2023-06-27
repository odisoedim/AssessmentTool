import dayjs from 'dayjs'
import { inject, InjectionKey, provide } from '@nuxtjs/composition-api'

const dayjsSymbol: InjectionKey<typeof dayjs> = Symbol('nuxt-dayjs')
export const provideDayjs = (nuxtDayjs: typeof dayjs) => {
  provide(dayjsSymbol, nuxtDayjs)
}

export const useDayjs = () => {
  const nuxtDayjs = inject(dayjsSymbol)
  if (!nuxtDayjs) throw new Error('inject nuxtDayjs failed')
  return nuxtDayjs
}
