<template>
  <div
    class="flex justify-end items-center hover:bg-kh-primary-50 active:bg-kh-primary-100 cursor-pointer"
  >
    <ce-menu-item>{{ text }}</ce-menu-item>
    <div class="dropdown-item_icon m-2">
      <slot name="icon"></slot>
      <ce-icon v-if="!$slots.icon" :name="icon" theme="gray" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeMenuItem from '~/components/atoms/CeMenuItem.vue'
import CeIcon from '~/components/atoms/CeIcon.vue'

export default defineComponent({
  name: 'DropdownItem',
  components: { CeIcon, CeMenuItem },
  props: {
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
  },
})
</script>
