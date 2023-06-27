import { mount, shallowMount } from '@vue/test-utils'
import OrganisationBoardingWelcome from '~/components/molecules/OrganisationBoardingWelcome.vue'
import CeButton from '~/components/atoms/CeButton.vue'

describe('OrganisationBoardingWelcome', () => {
  it('can work', () => {
    const wrap = shallowMount(OrganisationBoardingWelcome)
    expect(wrap).toBeTruthy()
  })
  it('will emit `next` if click `Next`', async () => {
    const next = jest.fn()
    const wrap = mount({
      components: {
        OrganisationBoardingWelcome,
      },
      template: '<OrganisationBoardingWelcome @next="next" />',
      setup() {
        return { next }
      },
    })
    const button = wrap.findComponent(CeButton)
    expect(next).toBeCalledTimes(0)
    await button.trigger('click')
    expect(next).toBeCalledTimes(1)
  })
})
