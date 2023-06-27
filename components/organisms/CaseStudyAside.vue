<template>
  <div>
    <div
      v-if="articleData.main_image && articleData.main_image.url"
      class="w-60 h-[188px] mb-10"
    >
      <ce-image :src="articleData.main_image.url" />
    </div>
    <div
      v-if="articleData.organizations && articleData.organizations.length"
      class="mb-10"
    >
      <div
        v-for="item in articleData.organizations"
        :key="item.name"
        class="mb-4 flex items-center"
      >
        <div
          class="
            w-9
            h-9
            mr-3
            rounded-md
            overflow-hidden
            flex-none
            relative
            case-study-aside__logo
          "
        >
          <ce-image
            v-if="item.logo"
            :src="item.logo.url"
            alt="brand logo"
            class="w-9 h-9"
          />
          <ce-colorful-icon
            v-else
            name="logo-placeholder"
            class="logo-placeholder absolute -inset-2.5"
            :size="52 / 34"
          />
        </div>
        <ce-small-text>{{ item.name }}</ce-small-text>
      </div>
    </div>
    <div v-if="articleData.locations && articleData.locations.length">
      <ce-heading5 class="mb-3"> Location </ce-heading5>
      <ce-small-text
        v-for="item in articleData.locations"
        :key="item.name"
        class="mb-2 text-black"
      >
        {{ item.name }}
      </ce-small-text>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import CeColorfulIcon from '~/components/atoms/CeColorfulIcon.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import { Article } from '~/type/article'

export default defineComponent({
  name: 'CaseStudyAside',
  components: {
    CeSmallText,
    CeHeading5,
    CeImage,
    CeColorfulIcon,
  },
  props: {
    articleData: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
})
</script>
