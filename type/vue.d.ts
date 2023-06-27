declare module '*.vue' {
  import type { VueConstructor } from 'vue'
  const content: VueConstructor
  export default content
}

interface MouseEvent {
  path?: EventTarget[]
}
