export type ID = string | number
export type DateTime = string
export type Email = string
export type URL = string
export type Markdown = string
export interface BreadcrumbItem {
  nuxtLink: boolean
  to: string
  title: string
}
