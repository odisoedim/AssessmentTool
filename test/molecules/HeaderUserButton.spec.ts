import { mount, shallowMount } from '@vue/test-utils'
import HeaderUserButton from '~/components/molecules/HeaderUserButton.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import { expectText } from '~/test/helper/expect'

describe('HeaderUserButton', () => {
  it('can work', () => {
    const wrap = shallowMount(HeaderUserButton)
    expect(wrap).toBeTruthy()
  })
  describe('can set image and firstName', () => {
    it('show image if has image', () => {
      const wrap = shallowMount(HeaderUserButton, {
        propsData: { photoUrl: 'https://img' },
      })
      const img = wrap.findComponent(CeImage)
      expect(img).toBeTruthy()
      expect(img.vm.$props.src).toBe('https://img')
    })
    it('show first letter of first name if no photo', () => {
      const wrap = shallowMount(HeaderUserButton, {
        propsData: { firstName: 'lychee' },
      })
      expectText(wrap, 'L')
    })

    it('show first letter of first name if photo load fail', async () => {
      const wrap = mount(HeaderUserButton, {
        propsData: { firstName: 'lychee', photoUrl: 'https://img' },
      })
      const img = wrap.findComponent(CeImage)
      await img.vm.$emit('error')
      await wrap.vm.$nextTick()
      expectText(wrap, 'L')
    })
  })
})
