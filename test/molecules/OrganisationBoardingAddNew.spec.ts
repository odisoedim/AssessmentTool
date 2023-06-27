import { mount, shallowMount } from '@vue/test-utils'
import OrganisationBoardingAddNew from '~/components/molecules/OrganisationBoardingAddNew.vue'
import CeButton from '~/components/atoms/CeButton.vue'
// const
import { LINK_CREATE_ORG_ACCOUNT } from '~/constants/route'

describe('OrganisationBoardingAddNew', () => {
  it('can work', () => {
    const wrap = shallowMount(OrganisationBoardingAddNew)
    expect(wrap).toBeTruthy()
  })
  it('will render a tag by CeButton', () => {
    const wrap = shallowMount(OrganisationBoardingAddNew)
    const buttons = wrap.findAllComponents(CeButton)
    const link = buttons.at(0)
    expect(link.vm.$props.rootType).toBe('a')
    expect(link.vm.$attrs.href).toBe(LINK_CREATE_ORG_ACCOUNT)
    expect(link.vm.$attrs.target).toBe('_blank')
  })
  it('will emit `back` if click `Back`', async () => {
    const back = jest.fn()
    const wrap = mount({
      components: {
        OrganisationBoardingAddNew,
      },
      template: '<OrganisationBoardingAddNew @back="back" />',
      setup() {
        return { back }
      },
    })
    const button = wrap.find('button')
    expect(back).toBeCalledTimes(0)
    await button.trigger('click')
    expect(back).toBeCalledTimes(1)
  })
})
