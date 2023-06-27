import { mount, shallowMount } from '@vue/test-utils'
import CaseStudyAside from '~/components/organisms/CaseStudyAside.vue'
import { Article } from '~/type/article'
import CeImage from '~/components/atoms/CeImage.vue'
import '~/test/helper/svgIcon'

const articleMock: Article = {
  id: '1',
  title: 'title-1',
  main_image: { url: 'https://mainImage.com' },
  contenttype: {
    name: '',
  },
  locations: [
    {
      name: '1',
    },
    {
      name: '2',
    },
  ],
  organizations: [
    {
      logo: {
        url: 'https://brandImage.com',
      },
      name: 'test1',
    },
    {
      logo: null,
      name: 'test2',
    },
  ],
  outcome: '',
  problem: '',
  solution: '',
  summary: '',
  created_at: '',
  updated_at: '',
}
describe('CaseStudyAside.vue', () => {
  it('can work', () => {
    const wrap = mount(CaseStudyAside, {
      propsData: {
        articleData: articleMock,
      },
    })
    expect(wrap).toBeTruthy()
  })
  describe('has correct content', () => {
    it('has main image', () => {
      const wrap = shallowMount(CaseStudyAside, {
        propsData: {
          articleData: articleMock,
        },
      })
      const imgs = wrap.findAllComponents(CeImage)
      expect(
        imgs
          .filter((w) => w.attributes('src') === 'https://mainImage.com')
          .at(0)
          .exists()
      ).toBeTruthy()
    })
    it('has brand log image', () => {
      const wrap = shallowMount(CaseStudyAside, {
        propsData: {
          articleData: articleMock,
        },
      })
      expect(wrap.findAllComponents(CeImage).at(1).attributes('src')).toBe(
        'https://brandImage.com'
      )
    })
    it('has logo placeholder when logo is null', () => {
      const wrap = shallowMount(CaseStudyAside, {
        propsData: {
          articleData: articleMock,
        },
      })
      const logos = wrap.findAll('div.case-study-aside__logo')
      const logoPlaceholder = logos.at(1).find('CeIcon.logo-placeholder')
      expect(logoPlaceholder).toBeTruthy()
    })
  })
})
