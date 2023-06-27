<template>
  <div>
    <div ref="dropdown" class="flex items-center">
      <HeaderUserButton
        v-if="result"
        :photo-url="userPicture"
        :first-name="userName[0]"
        @click.native="open"
      />
      <SignIn v-else />
      <div v-if="visible" class="w-64 absolute right-0 top-full z-50">
        <DropdownContent
          :header="userName"
          :list="list"
          @active="active"
          @close="close"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
// hooks
import { useClickOut } from '@use/useClickOut'
import { useCookies } from '@use/useCookie'
import { useUserinfo } from '@use/useUserinfo'
import { useBoolean } from '~/composables'

// components
import HeaderUserButton from '~/components/molecules/HeaderUserButton.vue'
import SignIn from '~/components/molecules/SignIn.vue'
import DropdownContent from '~/components/molecules/DropdownContent.vue'

// const
import { AUTH0_TOKEN_KEY, COOKIE_TOKEN_KEY } from '~/util/static'
import { LINK_ORG_ACCOUNT } from '~/constants/route'

export default defineComponent({
  name: 'HeaderUser',
  components: { DropdownContent, SignIn, HeaderUserButton },
  setup() {
    const { result, clearInfo } = useUserinfo()

    const { bool: visible, close, open } = useBoolean()
    const dropdown = ref<HTMLDivElement>()
    useClickOut(dropdown, close)

    const userPicture = computed(() => {
      const userinfo = result.value?.userinfo
      return userinfo?.picture || ''
    })
    const userName = computed(() => {
      const { firstname, lastname } = result.value?.userinfo || {}
      return [firstname, lastname].filter(Boolean).join(' ')
    })
    const cookie = useCookies()

    return {
      result,
      open,
      visible,
      close,
      userPicture,
      userName,
      dropdown,
      list: ref([
        { name: 'update', text: 'Update my profile', icon: 'user' },
        { name: 'signOut', text: 'Sign out', icon: 'power' },
      ]),
      active: (name: 'update' | 'signOut') => {
        switch (name) {
          case 'signOut':
            clearInfo()
            cookie.remove(AUTH0_TOKEN_KEY)
            cookie.remove(COOKIE_TOKEN_KEY)
            window.location.href = `${process.env
              .AUTH0_SERVICE!}/logout?client_id=${process.env
              .CLIENT_ID!}&returnTo=${window.location.origin}`
            break
          case 'update':
            window.open(LINK_ORG_ACCOUNT, '_blank', 'noopener')
            break
        }
        close()
      },
    }
  },
})
</script>
