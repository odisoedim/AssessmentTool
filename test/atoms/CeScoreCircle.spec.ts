import { shallowMount } from '@vue/test-utils'
import CeScoreCircle from '~/components/atoms/CeScoreCircle.vue'

const pathD = function (diam: string | number) {
  return `
            M ${+diam / 2} ${+diam / 2}
            m 0 -${(+diam - 13) / 2}
            a ${(+diam - 13) / 2} ${(+diam - 13) / 2} 0 0 1 0 ${+diam - 13}
            a ${(+diam - 13) / 2} ${(+diam - 13) / 2} 0 0 1 0 -${+diam - 13}
            `
}
describe('CeScoreCircle.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(CeScoreCircle)
    expect(wrapper).toBeTruthy()
  })
  it('can change size', async () => {
    const wrapper = shallowMount(CeScoreCircle, {
      propsData: {
        diam: 100,
      },
    })
    expect(wrapper.find('svg').attributes('width')).toBe('100px')
    await wrapper.setProps({ diam: 200 })
    expect(wrapper.vm.$data.circlePath).toBe(pathD(200))
  })
  it('can change progress', async () => {
    const wrapper = shallowMount(CeScoreCircle, {
      propsData: {
        score: 50,
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.strokeDasharray).toBe(
      75 * +Math.PI.toFixed(2) + `px, ${150 * +Math.PI.toFixed(2)}px`
    )
  })
})
