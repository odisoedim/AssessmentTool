<template>
  <div class="shadow-normal bg-white rounded-b-lg">
    <ce-small-text v-if="header" class="dropdown_header text-right pr-4 py-6">{{
      header
    }}</ce-small-text>
    <ce-half-px-line v-if="header" class="bg-kh-grey-200" />
    <template v-if="organisations.length">
      <ce-small-text class="org_header text-right pr-4 py-4"
        >Organisations</ce-small-text
      >
      <ul>
        <li v-for="item in organisations" :key="item.organizationId">
          <dropdown-item
            :text="stringCut(item.organizationName)"
            class="dropdown-content__organisation"
            :class="{
              'bg-kh-primary-50': +item.organizationId === +currentOrganisation,
            }"
            @click.native="() => onSetOrganisation(item.organizationId)"
          >
            <template #icon>
              <div class="h-8 w-8 rounded-full overflow-hidden">
                <ce-image :src="item.organizationPhotoPath || ''" />
              </div>
            </template>
          </dropdown-item>
        </li>
      </ul>
      <ce-half-px-line class="bg-kh-grey-200" />
    </template>
    <ul>
      <li v-for="item in list" :key="item.name">
        <dropdown-item
          class="dropdown-content__option"
          :text="item.text"
          :icon="item.icon"
          @click.native="() => $emit('active', item.name)"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, useRouter } from '@nuxtjs/composition-api'

// hooks
import { useOrganisation } from '@use/useOrganisation'
// components
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import DropdownItem from '~/components/atoms/DropdownItem.vue'
import CeHalfPxLine from '~/components/atoms/CeHalfPxLine.vue'
import CeImage from '~/components/atoms/CeImage.vue'

// utils
import { stringCut } from '~/util/stringCut'

// type
import { ID } from '~/type/base'

// const
import { LINK_ASSESSMENT } from '~/constants/route'

export default defineComponent({
  name: 'DropdownContent',
  components: { CeImage, CeHalfPxLine, DropdownItem, CeSmallText },
  props: {
    header: {
      type: String,
      default: '',
    },
    list: {
      type: Array as PropType<{ text: string; icon: string; name: string }[]>,
      default: () => [],
    },
  },
  emits: ['active', 'close'],
  setup(props, { emit }) {
    const { organisations, setOrganisation, currentOrganisation } =
      useOrganisation()
    const router = useRouter()

    const onSetOrganisation = (id: ID) => {
      if (id === currentOrganisation.value) return
      router.push(LINK_ASSESSMENT)
      setOrganisation(id)
      // @ts-ignore
      const { history } = router
      const getCurrentPath = history.current.path

      const isAssessmentPath =
        getCurrentPath === LINK_ASSESSMENT ||
        getCurrentPath === `${LINK_ASSESSMENT}/`

      if (isAssessmentPath) window.location.reload()
      props.header && emit('close')
    }
    return { organisations, stringCut, onSetOrganisation, currentOrganisation }
  },
})
</script>
