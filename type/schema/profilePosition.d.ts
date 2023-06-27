import { ID } from '~/type/base'

export interface profileOption {
  id: ID
  text: string
  value: string | number
  order: number
  type: string
}
