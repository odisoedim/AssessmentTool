import { mount } from '@vue/test-utils'
import CeModal from '~/components/molecules/CeModal.vue'
import CeOverlay from '~/components/atoms/CeOverlay.vue'
import '../helper/svgIcon'
import { useBoolean } from '~/composables'
import { expectClass, expectStyle } from '~/test/helper/expect'
import { NO_SCROLL } from '~/util/static'

describe('CeModal', () => {
  process.client = true
  it('should control', async function () {
    const wrap = mount({
      components: { CeModal },
      template: `
        <div>
        <ce-modal v-model='bool' />
        <button @click='open' id='open'></button>
        </div>`,
      setup() {
        const { bool, open } = useBoolean()
        return { bool, open }
      },
    })
    const overlay = wrap.findComponent(CeOverlay)
    expect(overlay.isVisible()).toBeFalsy()
    let modal = wrap.find('.ce-modal__modal')
    expect(modal.exists()).toBeFalsy()
    await wrap.get('button#open').trigger('click')
    await wrap.vm.$nextTick()
    expect(overlay.isVisible()).toBeTruthy()
    modal = wrap.find('.ce-modal__modal')
    expect(modal.exists()).toBeTruthy()
    expect(document.body.classList.contains(NO_SCROLL)).toBeTruthy()
  })

  it('can hide header', () => {
    const wrap = mount(CeModal, {
      propsData: {
        value: true,
        showHeader: false,
      },
    })
    expect(wrap.find('.ce-modal__header').exists()).toBeFalsy()
  })
  it('can set classList for modal body', () => {
    const wrap = mount(CeModal, {
      propsData: {
        value: true,
        modalClass: 'lol',
      },
    })
    const modalBody = wrap.find('.ce-modal__modal')
    expectClass(modalBody, 'lol')
  })
  it('can set zIndex, and overlay will use the number, and modal will use the number plus one ', () => {
    const wrap = mount(CeModal, {
      propsData: {
        value: true,
        zIndex: 1324,
      },
    })
    const overlay = wrap.find('.ce-overlay')
    expectStyle(overlay, { zIndex: '1324' })
    const modalBody = wrap.find('.ce-modal__modal')
    expectStyle(modalBody, { zIndex: '1325' })
  })
  describe('can set size', () => {
    it('can use number, it will translate to px', () => {
      const wrap = mount(CeModal, {
        propsData: {
          value: true,
          width: 324,
          height: 460,
        },
      })
      const modalBody = wrap.find('.ce-modal__modal')
      expectStyle(modalBody, { width: '324px', height: '460px' })
    })
    it('can use string', () => {
      const wrap = mount(CeModal, {
        propsData: {
          value: true,
          width: '50%',
          height: '50%',
        },
      })
      const modalBody = wrap.find('.ce-modal__modal')
      expectStyle(modalBody, { width: '50%', height: '50%' })
    })
  })
  describe('can set top', () => {
    it('default 50px', () => {
      const wrap = mount(CeModal, {
        propsData: {
          value: true,
          width: 324,
          height: 460,
        },
      })
      const modalBody = wrap.find('.ce-modal__modal')
      expectStyle(modalBody, { top: '50px' })
    })
    it('set by prop', () => {
      const wrap = mount(CeModal, {
        propsData: {
          value: true,
          width: 324,
          height: 460,
          top: 100,
        },
      })
      const modalBody = wrap.find('.ce-modal__modal')
      expectStyle(modalBody, { top: '100px' })
    })
  })
  it('will set body.style.overflow to auto when modal unmounted and visible eq true', () => {
    const wrap = mount(CeModal, {
      propsData: {
        value: true,
      },
    })
    expect(document.body.classList.contains(NO_SCROLL)).toBeTruthy()
    wrap.destroy()
    expect(document.body.classList.contains(NO_SCROLL)).toBeFalsy()
  })
  describe('it can close by click overlay', () => {
    it('default not', async () => {
      const wrap = mount(CeModal, {
        propsData: {
          value: true,
        },
      })
      let modal = wrap.find('.ce-modal__modal')
      expect(modal.exists()).toBeTruthy()
      await wrap.findComponent(CeOverlay).trigger('click')
      modal = wrap.find('.ce-modal__modal')
      expect(modal.exists()).toBeTruthy()
    })
    it('can set true', async () => {
      const wrap = mount({
        components: {
          CeModal,
        },
        setup() {
          const { bool } = useBoolean(true)
          return { bool }
        },
        template: `
          <CeModal v-model='bool' close-by-overlay></CeModal>
        `,
      })
      let modal = wrap.find('.ce-modal__modal')
      expect(modal.exists()).toBeTruthy()
      await wrap.findComponent(CeOverlay).trigger('click')
      modal = wrap.find('.ce-modal__modal')
      expect(modal.exists()).toBeFalsy()
    })
  })
  describe('it can have a close icon', () => {
    it('default not', () => {
      const wrap = mount(CeModal, {
        propsData: {
          value: true,
        },
      })
      const closeIcon = wrap.find('.ce-modal__close')
      expect(closeIcon.exists()).toBeFalsy()
    })
    it('show icon if closeByIcon true', async () => {
      const wrap = mount({
        components: {
          CeModal,
        },
        setup() {
          const { bool } = useBoolean(true)
          return { bool }
        },
        template: `
          <CeModal v-model='bool' close-by-icon :showHeader='false'></CeModal>
        `,
      })
      const closeIcon = wrap.find('.ce-modal__close')
      let modal = wrap.find('.ce-modal__modal')
      expect(modal.exists()).toBeTruthy()
      await closeIcon.trigger('click')
      modal = wrap.find('.ce-modal__modal')
      expect(modal.exists()).toBeFalsy()
    })
    it('will not show icon if showHeader true', () => {
      const wrap = mount(CeModal, {
        propsData: {
          value: true,
          closeByIcon: true,
          showHeader: true,
        },
      })
      const closeIcon = wrap.find('.ce-modal__close')
      expect(closeIcon.exists()).toBeFalsy()
    })
  })
})
