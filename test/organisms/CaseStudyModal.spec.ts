import { shallowMount } from '@vue/test-utils'
import CaseStudyModal from '~/components/organisms/CaseStudyModal.vue'
import '../helper/svgIcon'
import CeModal from '~/components/molecules/CeModal.vue'
import CaseStudyAside from '~/components/organisms/CaseStudyAside.vue'
import CaseStudyArticle from '~/components/organisms/CaseStudyArticle.vue'

const articleData = {
  id: '3',
  title: 'title-3',
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
      logo: {
        url: 'https://hello.com',
      },
      name: '',
    },
  ],
  outcome: '',
  problem: '',
  solution: '',
  summary: '',
  created_at: '',
  updated_at: '',
}
describe('CaseStudyModal.vue', () => {
  it('use v-model', async () => {
    const wrap = shallowMount(CaseStudyModal, {
      propsData: {
        value: false,
        title: '',
        articleId: '',
        caseData: articleData,
      },
    })
    const modal = wrap.findComponent(CeModal)
    expect(modal.vm.$props.value).toBe(false)
    await wrap.setProps({ value: true })
    expect(modal.vm.$props.value).toBe(true)
  })
  it('renders case article components ', () => {
    const wrap = shallowMount(CaseStudyModal, {
      propsData: {
        value: true,
        title: '',
        articleId: '1',
        caseData: articleData,
      },
    })
    const aside = wrap.findComponent(CaseStudyAside)
    expect(aside.exists()).toBe(true)
    const article = wrap.findComponent(CaseStudyArticle)
    expect(article.exists()).toBe(true)
  })
  it('has correctly redirect url', async () => {
    const wrap = shallowMount(CaseStudyModal, {
      propsData: {
        value: true,
        title: '',
        articleId: '2',
        caseData: articleData,
      },
    })
    await wrap.vm.$nextTick()
    expect(wrap.vm.$data.href).toBe(
      'https://knowledge-hub.circle-lab.com/article/3'
    )
  })
})
