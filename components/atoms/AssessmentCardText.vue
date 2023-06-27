<template>
  <div class="px-6 pt-[31px] pb-[22.5px] text-kh-grey">
    <div v-if="loading" class="-mb-2.5">
      <div class="mb-6">
        <ce-skeleton class="h-4.5 mb-2"></ce-skeleton>
      </div>
      <ce-skeleton class="h-4 mb-2.5"></ce-skeleton>
    </div>
    <div v-else>
      <ce-heading4 class="truncate-2 mb-4">
        {{ cardTitle }}
      </ce-heading4>
      <ce-p class="truncate-2"> Framework: {{ keyElement }} </ce-p>
      <ce-p class="!flex last-edit !text-[14px] items-center mt-[15px]">
        {{
          lastEdited &&
          `Last edited on ${lastEdited} ${
            !!userProfileInfo.firstName ? 'by' : ''
          }`
        }}

        <HeaderUserButton
          v-if="!!userProfileInfo.firstName"
          class="mx-[4px] w-[34px] h-[34px]"
          :photo-url="userProfileInfo.picture"
          :first-name="userProfileInfo.firstName[0]"
        />
        {{ userProfileInfo.firstName || '' }}
      </ce-p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

// components
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import CeSkeleton from '~/components/atoms/CeSkeleton.vue'
import CeP from '~/components/atoms/CeP.vue'
import HeaderUserButton from '~/components/molecules/HeaderUserButton.vue'

export default defineComponent({
  name: 'AssessmentCardText',
  components: { CeHeading4, CeSkeleton, CeP, HeaderUserButton },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    cardTitle: {
      type: String,
      required: true,
    },
    keyElement: {
      type: String,
      required: true,
    },
    userProfileInfo: {
      type: Object,
      default: () => {
        return {
          firstName: '',
          picture: '',
        }
      },
    },
    lastEdited: {
      type: String,
      default: '',
    },
  },
})
</script>
