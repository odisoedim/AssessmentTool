import { Ref, useMeta } from '@nuxtjs/composition-api'
import {
  LinkPropertyHref,
  MetaInfo,
  MetaPropertyName,
} from 'vue-meta/types/vue-meta'
import { PageMeta } from '~/type/landingPage'

export const _useMeta = (_pageMeta: Ref<PageMeta | null>) => () => {
  const pageMeta = _pageMeta.value
  const meta: MetaPropertyName[] = []
  const link: LinkPropertyHref[] = []
  const metaInfo: MetaInfo = {}
  if (pageMeta) {
    if (pageMeta.robots) {
      meta.push({
        name: 'robots',
        content: pageMeta.robots,
      })
    }
    if (pageMeta.description) {
      meta.push({
        name: 'description',
        content: pageMeta.description,
      })
    }
    if (pageMeta.title) {
      metaInfo.title = pageMeta.title
    }
    if (pageMeta.canoical) {
      link.push({
        rel: 'canonical',
        href: pageMeta.canoical,
      })
    }
  }
  metaInfo.meta = meta
  metaInfo.link = link
  return metaInfo
}

export const usePageMeta = (_pageMeta: any) => useMeta(_useMeta(_pageMeta))
