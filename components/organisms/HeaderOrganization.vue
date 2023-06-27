<template>
  <client-only>
    <nuxt-link :to="LINK_ASSESSMENT">
      <div v-show="getOrganisation" class="flex items-center">
        <div v-show="imgUrl" class="h-8 w-8 rounded-full overflow-hidden">
          <ce-image :src="imgUrl" />
        </div>
        <ce-menu-item active class="ml-2.5">
          {{ stringCut(name) }}
        </ce-menu-item>
      </div>
    </nuxt-link>
  </client-only>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useOrganisation } from '@use/useOrganisation'
import CeImage from '~/components/atoms/CeImage.vue'
import CeMenuItem from '~/components/atoms/CeMenuItem.vue'
import { LINK_ASSESSMENT } from '~/constants/route'
import { stringCut } from '~/util/stringCut'

export default defineComponent({
  name: 'HeaderOrganization',
  components: { CeMenuItem, CeImage },
  setup() {
    const { getOrganisation } = useOrganisation()
    const imgUrl = computed(
      () => getOrganisation.value?.organizationPhotoPath || ''
    )

    const name = computed(() => getOrganisation.value?.organizationName || '')
    return {
      getOrganisation,
      imgUrl,
      name,
      stringCut,
      LINK_ASSESSMENT,
    }
  },
})
</script>
