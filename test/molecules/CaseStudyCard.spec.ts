import { mount, shallowMount } from '@vue/test-utils'
import CaseStudyCard from '~/components/molecules/CaseStudyCard.vue'
import { expectAttr, expectStyle } from '~/test/helper/expect'
import CeImage from '~/components/atoms/CeImage.vue'

describe('CaseStudyCard.vue', () => {
  it('can work', () => {
    const wrap = mount(CaseStudyCard, {
      propsData: {
        text: 'California',
        image: 'https://test.com',
      },
    })
    expect(wrap).toBeTruthy()
  })

  it('renders image', () => {
    const wrap = mount(CaseStudyCard, {
      propsData: {
        text: 'California',
        image: 'https://test.com',
      },
    })
    const img = wrap.get('.case-study-img')
    expectStyle(img, {
      backgroundImage: `url(https://test.com)`,
    })
  })
  it('renders a no-image if image is null', () => {
    const wrap = shallowMount(CaseStudyCard, {
      propsData: {
        text: 'California',
        image: '',
      },
    })
    expect(wrap.findComponent(CeImage)).toBeTruthy()
  })
  it('is a div, but role is button', () => {
    const wrap = mount(CaseStudyCard, {
      propsData: {
        text: 'California',
        image: 'https://test.com',
      },
    })
    expectAttr(wrap, { role: 'button' })
  })
  it('renders text', () => {
    const wrap = mount(CaseStudyCard, {
      propsData: {
        text: 'California',
        image: 'https://test.com',
      },
    })
    expect(wrap.props('text')).toBe('California')
  })
})
