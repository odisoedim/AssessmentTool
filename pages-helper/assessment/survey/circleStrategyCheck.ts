import {
  inject,
  InjectionKey,
  provide,
  ref,
  Ref,
} from '@nuxtjs/composition-api'

export const circleStrategyCheckSymbol: InjectionKey<{
  noCircleStrategies: Ref<string[]>
  circleStrategies: Ref<string[]>
  setCircleStrategies: (value: string) => void
  reset: () => void
}> = Symbol('circleStrategyCheckSymbol')
export const provideCircleStrategyCheck = () => {
  const noCircleStrategies = ref<string[]>([])
  const circleStrategies = ref<string[]>([])
  const setCircleStrategies = (value: string) => {
    const index = circleStrategies.value.findIndex((i) => i === value)
    if (index > -1) {
      circleStrategies.value.splice(index, 1)
    } else {
      circleStrategies.value.push(value)
    }
  }
  const reset = () => {
    circleStrategies.value = []
  }
  provide(circleStrategyCheckSymbol, {
    circleStrategies,
    setCircleStrategies,
    reset,
    noCircleStrategies,
  })
}
export const useCircleStrategyCheck = () => inject(circleStrategyCheckSymbol)!
