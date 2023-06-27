<template>
  <div>
    <ce-heading3>To add a new organisation...</ce-heading3>
    <ce-p class="w-[380px] mb-7 mt-2"
      >You will be redirected to our Circle Lab account system to create a basic
      organisation profile. Once you have added the new organisation to the
      account system you can return to Circularity Assessment Tool and sign in.
      To continue, click add new organisation below.</ce-p
    >
    <div class="mb-8">
      <ce-button root-type="a" :href="LINK_CREATE_ORG_ACCOUNT" target="_blank"
        >Add new organisation</ce-button
      >
    </div>
    <div>
      <ce-button theme="secondary" @click="() => $emit('back')">Back</ce-button>
    </div>
    <div class="h-[136px] w-[117px] absolute right-[90px] bottom-[75px]">
      <ce-image :src="cat"></ce-image>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import CeButton from '~/components/atoms/CeButton.vue'

// const
import { LINK_CREATE_ORG_ACCOUNT } from '~/constants/route'

export default defineComponent({
  name: 'OrganisationBoardingAddNew',
  components: { CeButton, CeImage, CeP, CeHeading3 },
  emits: ['back'],
  setup() {
    const cat = require('~/assets/images/cat.png')

    return { cat, LINK_CREATE_ORG_ACCOUNT }
  },
})
</script>
