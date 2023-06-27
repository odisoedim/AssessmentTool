<template>
  <div class="flex mt-[111px] justify-between">
    <ul class="w-[396px] mr-[42px]">
      <li
        v-for="(item, index) in itemList"
        :key="item.id"
        class="my-8 cursor-pointer first:mt-0 item-list"
        :class="{ 'mt-[-11px] mb-[-13px]': activeIndex === index }"
        @click="changeItem(item, index)"
      >
        <ce-item :active="activeIndex === index">
          {{ item.name }}
        </ce-item>
      </li>
    </ul>
    <div v-if="activeIndex < 0" class="w-[594px] flex-auto">information</div>
    <survey-panel v-else :item-id="itemId" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from '@nuxtjs/composition-api'
import { useParamsId } from '@use/useParamsId'
import CeItem from '~/components/molecules/CeItem.vue'
import SurveyPanel from '~/components/organisms/SurveyPanel.vue'
import { FrameworkElement } from '~/type/frameworkElement'

export default defineComponent({
  name: 'CeItemList',
  components: {
    CeItem,
    SurveyPanel,
  },
  props: {
    itemList: {
      type: Array as PropType<FrameworkElement[]>,
      required: true,
    },
  },
  setup() {
    const activeIndex = ref<number>(-1)
    const itemId = ref<number>()
    return {
      activeIndex,
      itemId,
      id: useParamsId(),
      changeItem: (item: FrameworkElement, index: number) => {
        activeIndex.value = index
        itemId.value = +item.id
      },
    }
  },
})
</script>
