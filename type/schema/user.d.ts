import { DateTime, ID } from '~/type/base'

export interface User {
  id: ID
  created_at?: DateTime
  updated_at?: DateTime
  username: string
  email?: string
  provider?: string
  confirmed?: boolean
  blocked?: boolean
}
