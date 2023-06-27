import { mount } from '@vue/test-utils'
import LandingAssessmentCard from '~/components/molecules/LandingAssessmentCard.vue'
import { expectText } from '~/test/helper/expect'

describe('LandingSectionTitle', () => {
  it('can work', () => {
    const wrap = mount(LandingAssessmentCard)
    expect(wrap.exists()).toBeTruthy()
  })
  it('has left slot', () => {
    const wrap = mount(LandingAssessmentCard, { slots: { left: 'left' } })
    expectText(wrap, 'left')
  })
  it('has right slot', () => {
    const wrap = mount(LandingAssessmentCard, { slots: { right: 'right' } })
    expectText(wrap, 'right')
  })
  it('isExpand prop change', async () => {
    const wrap = mount(LandingAssessmentCard, {
      slots: { left: 'left', right: 'right' },
    })
    expect(wrap.find('.opacity-0').exists()).toBeTruthy()
    wrap.setProps({ isExpand: true })
    await wrap.vm.$nextTick()
    expect(wrap.find('.opacity-100').exists()).toBeTruthy()
  })
  it('will emit events when click card', async () => {
    const expandFn = jest.fn()
    const closeFn = jest.fn()
    const wrap = mount({
      components: { LandingAssessmentCard },
      setup() {
        return {
          cb: expandFn,
          cb2: closeFn,
        }
      },
      template: `
        <LandingAssessmentCard @expand='cb' @close='cb2' />
      `,
    })
    const landingAssessmentCardLeft = wrap.find('.card-left')
    await landingAssessmentCardLeft.trigger('click')
    expect(expandFn).toBeCalledTimes(1)
    const landingAssessmentCardClose = wrap.find('.card-close')
    await landingAssessmentCardClose.trigger('click')
    expect(closeFn).toBeCalledTimes(1)
  })
  it('will not emit expand event when isExpand prop is true', async () => {
    const fn = jest.fn()
    const wrap = mount({
      components: { LandingAssessmentCard },
      setup() {
        return {
          cb: fn,
        }
      },
      template: `
        <LandingAssessmentCard :is-expand="true" @expand='cb' />
      `,
    })
    const landingAssessmentCardLeft = wrap.find('.card-left')
    await landingAssessmentCardLeft.trigger('click')
    expect(fn).toBeCalledTimes(0)
  })
})
