import { defineNuxtPlugin, onGlobalSetup } from '@nuxtjs/composition-api'
import { provideApollo } from '@use/apollo/provideApollo'
import { provideAxios } from '@use/useAxios'
import { GraphqlFrom, Service } from '~/type/enum'

export default defineNuxtPlugin(() => {
  onGlobalSetup(() => {
    provideApollo({
      [GraphqlFrom.CMS]: process.env.STRAPI_GRAPHQL!,
      [GraphqlFrom.KH]: process.env.HK_STRAPI_GRAPHQL!,
    })
    provideAxios({
      [Service.ES]: process.env.HK_ES_SERVICE!,
      [Service.CMS]: process.env.STRAPI_REST!,
      [Service.AUTH0]: process.env.AUTH0_SERVICE!,
      [Service.ACCOUNT]: process.env.ACCOUNT_SERVICE!,
      [Service.MIDDLEWARE]: process.env.CAT_MIDDLEWARE_REST!,
    })
  })
})
