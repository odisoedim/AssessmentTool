import { mount, shallowMount } from '@vue/test-utils'
import { useSurveyIdsMock, useSurveyStoreMock } from '~/test/helper/mockInject'
import SurveyExit from '~/components/organisms/SurveyExit.vue'
import CeModalWithContent from '~/components/molecules/CeModalWithContent.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeP from '~/components/atoms/CeP.vue'
import {
  expectAttr,
  expectRootNodeName,
  expectText,
} from '~/test/helper/expect'

const useSurveyIds = useSurveyIdsMock()
const useSurveyStore = useSurveyStoreMock()

jest.mock('~/pages-helper/assessment/survey/surveyIds', () => ({
  useSurveyIds: () => useSurveyIds.mock(),
}))
jest.mock('~/pages-helper/assessment/survey/surveyStore', () => ({
  useSurveyStore: () => useSurveyStore.mock(),
}))
useSurveyIds.mockValue('3', '2')
describe('SurveyExit', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyExit, {
      propsData: {
        fromDemo: true,
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('has a button', () => {
    const wrap = mount(SurveyExit, {
      propsData: {
        fromDemo: true,
      },
    })
    const button = wrap.findComponent(CeButton)
    expectRootNodeName(button, 'button')
    expectText(button, 'Save and resume later')
  })
  it('default not show modal', () => {
    const wrap = mount(SurveyExit, {
      propsData: {
        fromDemo: true,
      },
    })
    const modal = wrap.find('.ce-modal__modal')
    expect(modal.exists()).toBeFalsy()
  })
  it('save data after click button', async () => {
    const wrap = mount(SurveyExit, {
      propsData: {
        fromDemo: true,
      },
    })
    const button = wrap.findComponent(CeButton)
    await button.trigger('click')
    expect(useSurveyStore.save).toBeCalledTimes(1)
  })
  it('show modal after click button', async () => {
    const wrap = mount(SurveyExit, {
      propsData: {
        fromDemo: true,
      },
    })
    const button = wrap.findComponent(CeButton)
    let modal = wrap.find('.ce-modal__modal')
    expect(modal.exists()).toBeFalsy()
    await button.trigger('click')
    modal = wrap.find('.ce-modal__modal')
    expect(modal.exists()).toBeTruthy()
  })
  it('show modal and modal has 2 buttons', async () => {
    const wrap = mount(SurveyExit)
    const openButton = wrap.findComponent(CeButton)
    await openButton.trigger('click')
    const buttons = wrap
      .findComponent(CeModalWithContent)
      .findAllComponents(CeButton)
    const continueSurvey = buttons.at(0)
    const exit = buttons.at(1)
    expectText(exit, 'Exit')
    expectRootNodeName(exit, 'a')
    expectAttr(exit, { href: '/assessment/overview/3' })
    expectText(continueSurvey, 'Continue survey')
  })

  it('close modal when click `Continue survey`', async () => {
    const wrap = mount(SurveyExit, {
      propsData: {
        fromDemo: true,
      },
    })
    const openButton = wrap.findComponent(CeButton)
    await openButton.trigger('click')
    const buttons = wrap
      .findComponent(CeModalWithContent)
      .findAllComponents(CeButton)
    const continueSurvey = buttons.at(0)
    await continueSurvey.trigger('click')
    const modal = wrap.find('.ce-modal__modal')
    expect(modal.exists()).toBeFalsy()
  })
  it('ceHeading3 and ceP have correct text', async () => {
    const wrap = mount(SurveyExit, {
      propsData: {
        fromDemo: true,
      },
    })
    const openButton = wrap.findComponent(CeButton)
    await openButton.trigger('click')
    const ceHeading3 = wrap
      .findComponent(CeModalWithContent)
      .findComponent(CeHeading3)
    expectText(ceHeading3, 'Your responses have been saved.')
    const ceP = wrap.findComponent(CeModalWithContent).findComponent(CeP)
    expect(ceP.text())
      .toBe(`Are you sure you want to exit this survey? You will return to the
        assessment overview.`)
  })
})
