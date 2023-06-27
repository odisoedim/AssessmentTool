import { mount } from '@vue/test-utils'
import { _useMeta, usePageMeta } from '@use/usePageMeta'
import { ref } from '@nuxtjs/composition-api'

describe('usePageMeta', () => {
  it('can work', () => {
    const wrap = mount({
      head: {},
      template: '<div></div>',
      setup() {
        usePageMeta(
          ref({
            title: '1',
            robots: '2',
            description: '3',
            canoical: '4',
          })
        )
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('can export metaInfo by PageMeta', () => {
    const { title, meta, link } = _useMeta(
      ref({
        title: 'title_1',
        robots: 'robots_2',
        description: 'description_3',
        canoical: 'canoical_4',
      })
    )()
    expect(title).toBe('title_1')
    expect(meta?.length).toBe(2)
    expect(meta?.[0].content).toBe('robots_2')
    expect(meta?.[1].content).toBe('description_3')
    expect(link?.length).toBe(1)
    expect(link?.[0].href).toBe('canoical_4')
  })
})
