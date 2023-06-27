import { mount, shallowMount } from '@vue/test-utils'
import dayjs from 'dayjs'
import { defineComponent } from '@nuxtjs/composition-api'
import { provideDayjs } from '@use/useDayjs'

import { Article } from '~/type/article'
import CeHeading2 from '~/components/atoms/CeHeading2.vue'
import CaseStudyArticle from '~/components/organisms/CaseStudyArticle.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import CeFinePrint from '~/components/atoms/CeFinePrint.vue'

const articleMock: Article = {
  id: '1',
  title: 'title-1',
  main_image: { url: 'https://hello.com' },
  contenttype: {
    name: '',
  },
  locations: [
    {
      name: '',
    },
  ],
  organizations: [
    {
      logo: null,
      name: '',
    },
  ],
  outcome: 'outcome',
  problem: 'problem',
  solution: '',
  summary: '',
  created_at: '',
  updated_at: '',
}

const wrapComponent = (value: Article = articleMock) =>
  defineComponent({
    components: { CaseStudyArticle },
    setup() {
      provideDayjs(dayjs)
      return { caseData: value }
    },
    template: `<case-study-article
    :article-data="caseData"
    ></case-study-article>`,
  })
describe('CaseStudyArticle.vue', () => {
  it('can work', () => {
    const wrap = shallowMount(wrapComponent(articleMock))
    expect(wrap).toBeTruthy()
  })
  it('show logo', () => {
    const wrap = mount(wrapComponent(articleMock))
    const logo = wrap.findComponent(CeImage)
    expect(logo).toBeTruthy()
    expect(logo.vm.$props.src).toBeTruthy()
  })
  it('has CeFinePrint and has text', () => {
    const wrap = mount(wrapComponent(articleMock))
    const ceFinePrint = wrap.findComponent(CeFinePrint)
    expect(ceFinePrint.exists()).toBeTruthy()
    expect(ceFinePrint.text()).toBe(
      `The Knowledge Hub is an open-access, collaborative library brimming
      with more than 3000 inspiring circular economy case studies. They
      deliver real-life proof that a circular economy can work and is
      beneficial.`
    )
  })
  describe('has correct content', () => {
    it('has title', () => {
      const wrap = mount(wrapComponent(articleMock))
      const title = wrap.findComponent(CeHeading2)
      expect(title.text()).toBe('title-1')
    })
    it('has section', () => {
      const wrap = mount(wrapComponent(articleMock))
      const outcome = wrap.find('.outcome')
      const problem = wrap.find('.problem')

      expect(outcome.exists()).toBeTruthy()
      expect(outcome.text()).toBe('outcome')
      expect(problem.exists()).toBeTruthy()
      expect(problem.text()).toBe('problem')
    })
    it('has not section', () => {
      const wrap = mount(wrapComponent(articleMock))
      const solution = wrap.find('.solution')
      expect(solution.exists()).toBeFalsy()
    })
  })
})
