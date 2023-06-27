import { useRouter } from '@nuxtjs/composition-api'
import { useUserinfo } from '@use/useUserinfo'
import { useOrganisation } from '@use/useOrganisation'
import { LOGIN_REDIRECT } from '~/util/static'
import { ErrMsg } from '~/util/errMsg'
import { LINK_ORG_PROFILE } from '~/constants/route'

const whiteList: RegExp[] = [/^\/$/, /^\/auth\/auth0/]
export const gotoLogin = (force = false) => {
  if (process.client) {
    const pathname = window.location.pathname
    if (force) {
      localStorage.setItem(LOGIN_REDIRECT, location.href)
      location.href = process.env.AUTH0! + `?callback=${location.origin}/auth/auth0`;
    }
    if (!whiteList.some((reg) => reg.test(pathname))) {
      localStorage.setItem(LOGIN_REDIRECT, location.href)
      location.href = process.env.AUTH0! + `?callback=${location.origin}/auth/auth0`;
    }
  }
}

export const checkUserAndOrg = () => {
  const router = useRouter()
  const { result: user } = useUserinfo()
  const { currentOrganisation: organisationId } = useOrganisation()
  return () => {
    if (!user.value) {
      gotoLogin()
      throw new Error(ErrMsg.NoLogged)
    }
    if (!organisationId.value) {
      router.replace(LINK_ORG_PROFILE)
      throw new Error(ErrMsg.NoOrganization)
    }
  }
}
