<template>
  <ce-modal v-model="visible" width="1032" height="640" close-by-overlay>
    <template #header>
      <div class="flex items-center">
        <span
          class="
            font-NotoSans font-bold
            tracking-2px
            leading-6
            inline-block
            text-sm
          "
        >
          Open case study in Knowledge Hub
          <CeLink :href="href" class="inline-block h-6 ml-3.5 -translate-y-0.5">
            <ce-icon name="external-link" without-padding theme="white" />
          </CeLink>
        </span>
      </div>
    </template>
    <div class="p-18 flex justify-between">
      <case-study-article
        :article-data="caseData"
        class="w-[570px]"
      ></case-study-article>
      <case-study-aside
        :article-data="caseData"
        class="w-60"
      ></case-study-aside>
    </div>
  </ce-modal>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useModel } from '@use/useModel'
import { Article } from '~/type/article'
import CeModal from '~/components/molecules/CeModal.vue'
import CeIcon from '~/components/atoms/CeIcon.vue'
import CaseStudyArticle from '~/components/organisms/CaseStudyArticle.vue'
import CaseStudyAside from '~/components/organisms/CaseStudyAside.vue'
import CeLink from '~/components/atoms/CeLink.vue'

export default defineComponent({
  name: 'CaseStudyModal',
  components: { CeLink, CeIcon, CeModal, CaseStudyAside, CaseStudyArticle },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    caseData: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const visible = useModel(
      () => props.value,
      (v) => emit('input', v)
    )
    const href = computed(
      () => `https://knowledge-hub.circle-lab.com/article/${props.caseData.id}`
    )
    return { visible, href }
  },
})
</script>
