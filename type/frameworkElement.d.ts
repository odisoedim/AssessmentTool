import { SubstrategyQuestion } from './substrategyQuestion'
import { ID } from '~/type/base'

export interface FrameworkElement {
  id: ID
  name: string
  description: string
  children: FrameworkElement[] | null
  framework: {
    name: string
    id: ID
    description: string
    short_description: string
  }
  substrategy_questions: SubstrategyQuestion[]
}
