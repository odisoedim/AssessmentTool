<template>
  <div>
    <div class="-mr-13.5 h-[304px]">
      <template v-if="loading">
        <case-study-card
          v-for="i in 3"
          :key="i"
          image=""
          text=""
          loading
          class="mr-13.5"
        />
      </template>
      <template v-else>
        <case-study-card
          v-for="(item, index) in caseList"
          :key="item.id"
          class="mr-13.5"
          :text="item.title"
          :image="item.main_image ? item.main_image.url : ''"
          @click.native="openModal(index)"
        />
      </template>
    </div>
    <case-study-modal
      v-if="!loading"
      v-model="visible"
      :case-data="caseList[activeIndex] || {}"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { useBoolean } from '~/composables'
import { Article } from '~/type/article'
import CaseStudyCard from '~/components/molecules/CaseStudyCard.vue'
import CaseStudyModal from '~/components/organisms/CaseStudyModal.vue'

export default defineComponent({
  name: 'CaseStudyCardGroup',
  components: { CaseStudyModal, CaseStudyCard },
  props: {
    caseList: {
      type: Array as PropType<Article[]>,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const { bool: visible, open } = useBoolean()
    const activeIndex = ref<number>()
    return {
      visible,
      openModal: (index: number) => {
        activeIndex.value = index
        open()
      },
      activeIndex,
    }
  },
})
</script>
