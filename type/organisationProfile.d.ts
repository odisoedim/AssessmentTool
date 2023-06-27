import { Ref } from '@nuxtjs/composition-api'
import { SelectOption } from '~/type/selectOption'
export interface FormItem {
  type: string
  title: string
  value: string | number
  options?: Ref<SelectOption[]> | SelectOption[]
  placeholder?: string
  prompt: string
  validationRule: {
    valid: Boolean
    length: { min: number; max?: number }
    error: string
  }
}

export interface FormData {
  organizationName: FormItem
  foundedYear: FormItem
  companyDescribe: FormItem
  sector: FormItem
  industry: FormItem
  annualTurnover: FormItem
  employeesNumber: FormItem
  [key: string]: FormItem
}
