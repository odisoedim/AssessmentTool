import { DateTime, Email, ID, URL } from '~/type/base'

export type AuthProvider = 'auth0'

export interface UserRole {
  id: ID
  name: string
  description: string
  type: string
}
export interface MeInfo {
  id: ID
  username: string
  email: Email
  role?: UserRole
}
export interface UserInfo {
  id: ID
  username: string
  email: Email
  provider: AuthProvider
  confirmed: boolean
  blocked: null | boolean
  role: UserRole
  created_at: DateTime
  updated_at: DateTime
}

export interface Auth0Info {
  jwt: string
  user: UserInfo
}
export interface OrganizationFromAccountSystem {
  jobTitle: string
  organizationId: ID
  organizationName: string
  organizationPhotoPath: URL
}
export interface AccountUserinfo {
  id: ID
  nickname: string
  firstname: string
  lastname: string
  email: Email
  picture: URL
  sub: string
  googlePicture: URL
  selectedOrganization: {}
  organizations: OrganizationFromAccountSystem[]
  communities: []
}
