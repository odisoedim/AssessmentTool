<template>
  <div class="text-center mt-20">
    <CeLoader v-if="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useRouteQuery } from '@use/useRouteQuery'
import { useOrg } from '@use/useOrg'
import { useFetchMeAuth0 } from '~/api/auth'
import { useRequest } from '~/composables'
import { useCookies } from '~/composables/useCookie'
import {
  AUTH0_TOKEN_KEY,
  COOKIE_TOKEN_KEY,
  LOGIN_REDIRECT
} from '~/util/static'
import CeLoader from '~/components/atoms/CeLoader.vue'

export default defineComponent({
  name: 'AuthAuth0',
  components: { CeLoader },
  layout: 'blank',
  setup() {
    const query = useRouteQuery()
    const cookie = useCookies()
    const fetchJwt = useFetchMeAuth0()
    const { fetch: updateOrg } = useOrg()
    const { result, error, loading } = useRequest(() => fetchJwt(query), {
      async success(res) {
        if (res && res.jwt) {
          cookie.set(COOKIE_TOKEN_KEY, res.jwt)
          cookie.set(AUTH0_TOKEN_KEY, query.value.access_token)
          await updateOrg()
          const beforeLogin = localStorage.getItem(LOGIN_REDIRECT)
          localStorage.removeItem(LOGIN_REDIRECT)
          const ASSESSMENT_PATH = '/assessment'
          location.href =
            beforeLogin === '/'
              ? ASSESSMENT_PATH
              : beforeLogin || ASSESSMENT_PATH
        }
      },
      fail() {
        cookie.set(COOKIE_TOKEN_KEY, '')
        cookie.set(AUTH0_TOKEN_KEY, '')
        localStorage.removeItem(LOGIN_REDIRECT)
        location.href = '/'
      }
    })

    return {
      result,
      error,
      loading
    }
  }
})
</script>
