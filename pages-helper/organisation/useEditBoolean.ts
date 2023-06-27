import { InjectionKey, provide, inject, Ref } from '@nuxtjs/composition-api'
import { useBoolean } from '~/composables'

const boolSymbol: InjectionKey<Ref<boolean>> = Symbol('bool')
const openSymbol: InjectionKey<() => boolean> = Symbol('open')
const closeSymbol: InjectionKey<() => boolean> = Symbol('close')

export const useProvideEditBoolean = () => {
  const { bool, open, close } = useBoolean()
  provide(openSymbol, open)
  provide(boolSymbol, bool)
  provide(closeSymbol, close)
}

export const useInjectEditBoolean: () => {
  bool: Ref<boolean> | undefined
  open: (() => boolean) | undefined
  close: (() => boolean) | undefined
} = () => ({
  bool: inject(boolSymbol),
  open: inject(openSymbol),
  close: inject(closeSymbol),
})
