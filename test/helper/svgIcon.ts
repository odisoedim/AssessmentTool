import Vue from 'vue'
Vue.component('SvgIcon', {
  props: {
    name: { type: String, required: true },
  },
  template: `<use :xlink:href='name'></use>`,
})
