import { Wrapper } from '@vue/test-utils'
import Vue from 'vue'

export const nextTick = async <El extends Element>(
  wrap: Wrapper<Vue, El>,
  count: number = 1
) => {
  for (let i = 0; i < count; i++) {
    await wrap.vm.$nextTick()
  }
}
