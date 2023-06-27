import Vue from 'vue'
Vue.component('NuxtLink', {
  props: {
    to: { type: String, required: true },
  },
  template: `<a :href='to'><slot></slot></a>`,
})
